// Dependencies
import Web3 from 'web3';
import axios from 'axios';
import { NFTStorage } from 'nft.storage';

// Abis
import NFTEvolve from '../smartcontracts/abi/NFTEvolve.json';
import { RinkebyAddress } from '../config/web3';
import { IPFS, STORAGE_KEYS } from '../utils/web3';

const web3 = new Web3(window.ethereum);
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MTI3MDUxNDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjExNTkxNjA1MSwibmFtZSI6ImRlZmF1bHQifQ.kn0H8kEawwLyS0uo_8Nwr-loUu_a-27DxQjdlD41_Hc' });

export const API = {
  mint: async function({
    name,
    description,
    quantity,
    photo,
    evolutions
  }) {
    let itemToAdd = {};

    // Upload photo to IPFS
    const photoId = await IPFS.add({
      content: photo
    });
    console.log({ photoId });

    const metadata = {
      name: name,
      description: description,
      image: `https://ipfs.io/ipfs/${photoId.path}`
    };

    itemToAdd = {
      ...metadata,
      quantity,
      evolutions: []
    };

    const metadataCid = await IPFS.add(Buffer.from(JSON.stringify(metadata)));

    Promise.all(evolutions.map(async function(evolution) {
      const evolutionPhotoId = await IPFS.add({
        content: evolution.photo
      });

      const metadata = {
        name: evolution.name,
        description: evolution.description,
        image: `https://ipfs.io/ipfs/${evolutionPhotoId.path}`
      };

      itemToAdd = {
        ...itemToAdd,
        evolutions: [
          ...itemToAdd.evolutions,
          metadata
        ]
      };

      const evolutionMetadata = await IPFS.add(Buffer.from(JSON.stringify(metadata)));

      return evolutionMetadata.path;
    })).then(async function(metadata) {
      console.log({ metadata });

      const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);

      const {
        events: {
          TransferSingle: {
            returnValues: {
              id
            }
          }
        }
      } = await contract.methods
        .mint(quantity, [metadataCid, ...metadata])
        .send({ from: window.ethereum.selectedAddress });

      itemToAdd.id = id;
      itemToAdd.evolvePhase = 0;

      API.addToList(itemToAdd);
    });
  },

  evolve: async function(nft) {
    console.log(nft);

    if (nft.evolvePhase < nft.evolutions.length) {
      axios.post('http://192.168.1.17:5000/evolve-nft', {
        contractAddress: String('0x4A37A0764506243C275A2999650155D984B3fd82').toLowerCase(),
        nftId: Number(nft.id),
        userAddress: window.ethereum.selectedAddress,
        evolutionPhase: nft.evolvePhase + 1
      })
        .then(async function({ data: { ipfsSignature } }) {
          console.log(ipfsSignature);

          const { data } = await axios.get(`https://ipfs.io/ipfs/${ipfsSignature}`);

          console.log({ data });

          const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);

          const len = (data.message.length / 2) - 1;
          const messageLen = web3.utils.asciiToHex(len.toString());

          const tx = await contract.methods.evolveNFT(data.message, messageLen, data.signature).send({
            from: window.ethereum.selectedAddress
          });

          const uri = await contract.methods.uri(Number(nft.id)).call({
            from: window.ethereum.selectedAddress
          });

          console.log({ uri });

          const formatedIPFSSignature = uri.replaceAll('ipfs://', '');
          console.log({ formatedIPFSSignature });

          const { data: evolutionData } = await axios.get(`https://ipfs.io/ipfs/${formatedIPFSSignature}`);

          console.log({ evolutionData });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },

  getById: function(id) {
    const currentItems = window.localStorage.getItem(STORAGE_KEYS.NFT_LIST);
    const item = JSON.parse(currentItems).filter(e => e.id === id)[0] ?? {};
    console.log({ getById: item });
    return item;
  },

  getAll: function() {
    const currentItems = window.localStorage.getItem(STORAGE_KEYS.NFT_LIST) ?? null;
    console.log({ getAll: currentItems });
    return currentItems ? JSON.parse(currentItems) : [];
  },

  mutateList: function(newList) {
    const objectToString = JSON.stringify(newList);
    console.log({ mutate: newList });
    window.localStorage.setItem(STORAGE_KEYS.NFT_LIST, objectToString);
  },

  addToList: function(nft) {
    const currentItems = API.getAll();
    currentItems.push(nft);
    API.mutateList(currentItems);
    return currentItems;
  }
};

export default API;
