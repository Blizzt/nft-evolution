const NFTEvolve = artifacts.require('./NFTEvolve.sol');

async function doDeploy(deployer, network, accounts) {
    /*
  const nft = await NFTEvolve.at(web3.utils.toChecksumAddress('0x145B7FE5D9DED82Fe840B3a36CB5b98feafaD7e0'));
  console.log('NFTEvolve deployed:', nft.address);
/*
  let message = "0x000000000000000000000000145b7fe5d9ded82fe840b3a36cb5b98feafad7e00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ea4ca1270cc91ac072c3b1d273da95ce8d024fb50000000000000000000000000000000000000000000000000000000000000001";
  let len = (message.length / 2) - 1;
  let messageLen = web3.utils.asciiToHex(len.toString());
  let signature = "0xed95491bc58235f789c2443b765b8d20365dd567872179c6b6c08aa44087cc8724f9f7eb28c66893160264385af02dda24fa1a6989ad37a8860d3ffce01c3ebb1b";

  const tx = await nft.evolveNFT(message, messageLen, signature);
  console.log(tx);
*/

   // let metadata = await nft.uri(1);
   // console.log(metadata.toString());
}

module.exports = function(deployer, network, accounts) {
  deployer.then(async() => {
    await doDeploy(deployer, network, accounts);
  });
};
