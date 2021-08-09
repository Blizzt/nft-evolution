// Dependencies
import Web3 from 'web3';
import axios from 'axios';
import { NFTStorage } from 'nft.storage';

// Abis
import NFTEvolve from '../smartcontracts/abi/NFTEvolve.json';
import { RinkebyAddress } from '../config/web3';
import { IPFS } from '../utils/web3';
import { getUnixTime } from 'date-fns';

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
      image: `https://ipfs.io/ipfs/${photoId.path}`,
      attributes: [
        {
          display_type: 'number',
          trait_type: 'Minted units',
          value: quantity
        },
        {
          display_type: 'date',
          trait_type: 'birthday',
          value: getUnixTime(new Date())
        }
      ]
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
      const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);

      const tx = await contract.methods
        .mint(quantity, [metadataCid.path, ...metadata])
        .send({ from: window.ethereum.selectedAddress });

      console.log({ tx });
    });
  },

  evolve: async function(nft) {
    return new Promise((resolve, reject) => {
      axios.post('http://192.168.1.17:5000/evolve-nft', {
        contractAddress: RinkebyAddress.toLowerCase(),
        nftId: Number(nft.id),
        userAddress: window.ethereum.selectedAddress,
        evolutionPhase: 2
      })
        .then(async function({ data: { ipfsSignature } }) {
          console.log(ipfsSignature);

          const { data } = await API.getFromIPFS(ipfsSignature);
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

          const IPFSSignature = uri.replaceAll('ipfs://', '');
          const { data: evolutionData } = await API.getFromIPFS(IPFSSignature);

          console.log({ evolutionData });
          resolve(evolutionData);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },

  getNFTById: function(id) {
    const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);
    return contract.methods.uri(Number(id)).call({
      from: window.ethereum.selectedAddress
    });
  },

  getAll: async function() {
    const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);
    const currentItem = await contract.methods.id().call({
      from: window.ethereum.selectedAddress
    });

    const fields = [];

    for (let i = 1; i < Number(currentItem) + 1; i++) {
      fields.push(i);
    }

    return Promise.all(fields.map(async function(id) {
      return API.getNFTById(id);
    }));
  },

  getFromIPFS: function(uri) {
    return axios.get(`https://ipfs.io/ipfs/${uri}`);
  }
};

export default API;
