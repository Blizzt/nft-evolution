// Dependencies
import Web3 from 'web3';
import { NFTStorage } from 'nft.storage';

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
    // Upload to IPFS
    const nftCid = await getNFTStorageClient().storeBlob(photo);

    console.log({ nftCid });

    console.log({ name, quantity, description, photo, evolutions });
  }
};

export default API;
