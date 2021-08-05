// Dependencies
import Web3 from 'web3';
import { NFTStorage } from 'nft.storage';

// Abis
import NFTEvolve from '../smartcontracts/abi/NFTEvolve.json';
import { RinkebyAddress } from '../config/web3';
import { IPFS } from '../utils/web3';

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
    console.log({ photo });

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

      const evolutionMetadata = await IPFS.add(Buffer.from(JSON.stringify(metadata)));

      return evolutionMetadata.path;
    })).then(async function(metadata) {
      const contract = new web3.eth.Contract(NFTEvolve, RinkebyAddress);

      const tx = await contract.methods
        .mint(quantity, metadata)
        .send({ from: window.ethereum.selectedAddress });

      console.log({ tx });
    });
  }
};

export default API;
