const TestToken = artifacts.require("TestToken");
const TestCheckPointManager = artifacts.require("TestCheckPointManager");
const BridgeDisputeManager = artifacts.require("BridgeDisputeManager");
const DisputeHelper = artifacts.require("DisputeHelper");
const RLPDecoder = artifacts.require("RLPDecoder");

module.exports = function(deployer, network, accounts) {

  deployer.then(async() => {
    if (network == "development") {
      await deployer.deploy(RLPDecoder);
      await deployer.deploy(TestCheckPointManager);
      await deployer.link(RLPDecoder, BridgeDisputeManager);
      await deployer.link(RLPDecoder, DisputeHelper);
      await deployer.deploy(TestToken, accounts[0]);

      const testCheckPointManager = await TestCheckPointManager.deployed();
      await deployer.deploy(BridgeDisputeManager, testCheckPointManager.address);
      await deployer.deploy(DisputeHelper, testCheckPointManager.address);
    }
  });
};
