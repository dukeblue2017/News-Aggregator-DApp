// var SubmitArticle = artifacts.require("./SubmitArticle.sol");

// contract('SimpleStorage', function(accounts) {

//   it("...should store the value 89.", function() {
//     return SimpleStorage.deployed().then(function(instance) {
//       simpleStorageInstance = instance;

//       return simpleStorageInstance.set(89, {from: accounts[0]});
//     }).then(function() {
//       return simpleStorageInstance.get.call();
//     }).then(function(storedData) {
//       assert.equal(storedData, 89, "The value 89 was not stored.");
//     });
//   });

// });

var SubmitArticle = artifacts.require("./SubmitArticle.sol");

contract('SubmitArticle', function(accounts) {

  it("Should allow a user to add submit an article", function() {
    return SubmitArticle.deployed().then(function(instance) {
      SubmitArticleInstance = instance;

      return SubmitArticleInstance.addArticle('testtitle', 'testurl', 'testauthor', 'testdate', {from: accounts[0]});
    }).then(function() {
      return SubmitArticleInstance.submitters.call();
    }).then(function(result) {
      console.log(result)
      // assert.equal(storedData, 89, "The value 89 was not stored.");
    });
  });

});

