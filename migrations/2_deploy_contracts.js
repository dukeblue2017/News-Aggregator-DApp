var SubmitArticle = artifacts.require("./SubmitArticle.sol");

module.exports = function(deployer) {
  deployer.deploy(SubmitArticle);
};
