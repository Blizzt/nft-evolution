const NFTEvolve = artifacts.require('./NFTEvolve.sol');

async function doDeploy(deployer, network, accounts) {
  await deployer.deploy(NFTEvolve, 'ipfs://');
  const nft = await NFTEvolve.deployed();
  console.log('NFTEvolve deployed:', nft.address);
}

module.exports = function(deployer, network, accounts) {
  deployer.then(async() => {
    await doDeploy(deployer, network, accounts);
  });
};
