const express = require("express");
const Web3 = require('web3');
const app = express();
const Blob = require('node-blob');
const NFTStorage = require('nft.storage');
const adminPrivKey = '069a1073c49ac1661dd94f583e9b6dd33a664b22ff3a3b9b144b042273ad93b2';

const web3 = new Web3('https://rinkeby.infura.io/v3/10c1f0579cc448bfa9e2a52a3bdaa451');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.post('/evolve-nft', async function(req, res) {
    const parameters = await web3.eth.abi.encodeParameters(
        [
          'address',
          'uint256',
          'address',
          'uint256'
        ],
        [
          req.body.contractAddress,
          req.body.nftId,
          req.body.userAddress,
          req.body.evolutionPhase
        ]
      );

    let signature = await web3.eth.accounts.sign(parameters, adminPrivKey);

    const ipfsClient = new NFTStorage.NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MTI3MDUxNDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjExNTkxNjA1MSwibmFtZSI6ImRlZmF1bHQifQ.kn0H8kEawwLyS0uo_8Nwr-loUu_a-27DxQjdlD41_Hc",
    });

    let blob = new Blob([JSON.stringify(signature)]);
    const ipfsSignature = await ipfsClient.storeBlob(
      blob.buffer, { type: 'text/json' }
    );

    res.status(200).send(ipfsSignature);
});

app.listen(5000, () => {
 console.log("El servidor está inicializado en el puerto 5000");
});
