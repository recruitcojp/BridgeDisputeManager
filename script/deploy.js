const hre = require("hardhat");
const utils = require('./utils')
const mainContractPath = "../v1-contracts/";


async function main() {
  let contractAddressObj = utils.getContractAddresses()
  let mainContractAddressObj = utils.getContractAddresses(mainContractPath)
  const accounts =  await ethers.getSigners();
  console.log("Network name =", hre.network.name);
  let polygonChildCheckPointManagerAddress = "";

  if(hre.network.name == "localhost") {

    const TestCheckPointManager = await hre.ethers.getContractFactory("TestCheckPointManager");
    const testCheckPointManager = await TestCheckPointManager.deploy();
    polygonChildCheckPointManagerAddress = testCheckPointManager.address;

  } else if(hre.network.name == "mumbai" || hre.network.name == "polygon") {
    polygonChildCheckPointManagerAddress = mainContractAddressObj[hre.network.name].PolygonChildCheckPointManager
  }

  const RLPDecoder = await hre.ethers.getContractFactory("RLPDecoder");
  const rlpDecoder = await RLPDecoder.deploy();
  const BridgeDisputeManager = await hre.ethers.getContractFactory("BridgeDisputeManager", {
    libraries: {
      RLPDecoder: rlpDecoder.address,
    },
  });

  const bridgeDisputeManager = await BridgeDisputeManager.connect(accounts[0]).deploy(polygonChildCheckPointManagerAddress);
  console.log("BridgeDisputeManager address:", bridgeDisputeManager.address);

  contractAddressObj[hre.network.name].BridgeDisputeManager = bridgeDisputeManager.address;
  utils.writeContractAddresses(contractAddressObj)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
