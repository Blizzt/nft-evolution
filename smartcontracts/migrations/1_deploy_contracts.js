var NFTEvolve = artifacts.require("./NFTEvolve.sol");

async function doDeploy(deployer, network, accounts) {

    await deployer.deploy(NFTEvolve, "ipfs://");
    let nft = await NFTEvolve.deployed();
    console.log('NFTEvolve deployed:', nft.address);
}
  
module.exports = function(deployer, network, accounts) {
    deployer.then(async () => {
      await doDeploy(deployer, network, accounts);
    });
  };
  