// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var SubmitArticle = artifacts.require("./SubmitArticle.sol");

module.exports = function(deployer) {
  // deployer.deploy(SimpleStorage);
  deployer.deploy(SubmitArticle);
};
