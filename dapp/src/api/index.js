// Dependencies
import Web3 from 'web3';
import axios from 'axios';

// Abis
import NFTEvolve from '../smartcontracts/abi/NFTEvolve.json';
import { RinkebyAddress } from '../config/web3';
import { IPFS } from '../utils/web3';
import { getUnixTime } from 'date-fns';
import { parseWithOptions } from 'date-fns/fp';

const web3 = new Web3(window.ethereum);

export const API = {
  mint: function({
    name,
    description,
    quantity,
    photo,
    evolutions
  }) {
    return new Promise(async function(resolve, reject) {
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
          image: `https://ipfs.io/ipfs/${evolutionPhotoId.path}`,
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
        resolve(true);
      });
    });
  },

  evolve: async function(nftId, code, setCurrentProgress = () => {}) {
    return new Promise(async(resolve, reject) => {
      try {
        setCurrentProgress(10);
        const { data } = await API.getFromIPFS(code);
        console.log({ data });

        setCurrentProgress(30);
        const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);

        setCurrentProgress(50);

        const len = (data.message.length / 2) - 1;
        const messageLen = web3.utils.asciiToHex(len.toString());

        setCurrentProgress(70);
        const tx = await contract.methods.evolveNFT(data.message, messageLen, data.signature).send({
          from: window.ethereum.selectedAddress
        });

        console.log({ tx });

        setCurrentProgress(80);
        const uri = await contract.methods.uri(Number(nftId)).call({
          from: window.ethereum.selectedAddress
        });

        console.log({ uri });

        setCurrentProgress(90);
        const IPFSSignature = uri.replaceAll('ipfs://', '');
        const { data: evolutionData } = await API.getFromIPFS(IPFSSignature);

        console.log({ evolutionData });
        resolve(evolutionData);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },

  getEvolutionCode: async function(nftId, setCurrentProgress = () => {}) {
    return new Promise((resolve, reject) => {
      setCurrentProgress(10);
      const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);
      contract.methods
        .evolvePhase(Number(nftId))
        .call({ from: window.ethereum.selectedAddress })
        .then(async function(phase) {
          setCurrentProgress(50);
          axios.post('http://127.0.0.1:5000/evolve-nft', {
            contractAddress: RinkebyAddress.toLowerCase(),
            nftId: Number(nftId),
            userAddress: window.ethereum.selectedAddress,
            evolutionPhase: Number(phase) + 1
          })
            .then(async function({ data: { ipfsSignature } }) {
              setCurrentProgress(100);
              resolve({ code: ipfsSignature });
            });
        })
        .catch((error) => {
          console.error(error);
          resolve(true);
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
      const uri = await API.getNFTById(id);
      return [id, uri];
    }));
  },

  getFromIPFS: function(uri) {
    return axios.get(`https://ipfs.io/ipfs/${uri}`);
  },

  transferNFT: async function(id, to, quantity) {
    const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);
    const tx = await contract.methods.safeTransferFrom(window.ethereum.selectedAddress, to, id, quantity, []).send({
      from: window.ethereum.selectedAddress
    });

    console.log(tx);
  },

  payToEvolve: async function(nftId, setCurrentProgress = () => {}) {
    return new Promise(async(resolve, reject) => {
      try {
        const code = prompt('Write the evolution code here');

        if (code === '' || !code) {
          return reject(new Error('You must enter a evolution code'));
        }

        setCurrentProgress(3);
        const { data } = await API.getFromIPFS(code);
        console.log({ data });

        setCurrentProgress(10);
        const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);

        setCurrentProgress(40);

        const len = (data.message.length / 2) - 1;
        const messageLen = web3.utils.asciiToHex(len.toString());

        setCurrentProgress(70);
        const tx = await contract.methods.payToEvolve(data.message, messageLen, data.signature).send({
          from: window.ethereum.selectedAddress,
          value: web3.utils.toWei('1')
        });

        console.log({ tx });

        setCurrentProgress(100);
        resolve(true);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
};

export default API;
