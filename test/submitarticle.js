var SubmitArticle = artifacts.require("./SubmitArticle.sol");

contract('SubmitArticle', async function(accounts) {

  it("Should allow a user to submit an article", function() {
    return SubmitArticle.deployed().then(function(instance) {
      SubmitArticleInstance = instance;

      return SubmitArticleInstance.addArticle("testtitle", "testurl", "testauthor", "testdate", {from: accounts[0], value: 1000});
    }).then(function() {
      return SubmitArticleInstance.submissions.call(accounts[0]);
    }).then(function(result) {
      const actualTitle = result[1]
      const expectedTitle = 'testtitle'
      assert.equal(actualTitle, expectedTitle, "The contract did not correctly store the submitted title");
      const actualExists = result[5]
      const expectedExists = true;
      assert.equal(actualTitle, expectedTitle, "The contract did not correctly store the submitted value of 'exists'");
    });
  });

  it("Should not allow a user to submit a second article", function() {
    return SubmitArticle.deployed().then(function(instance) {
      SubmitArticleInstance = instance;

      return SubmitArticleInstance.addArticle("testtitle", "testurl", "testauthor", "testdate", {from: accounts[0], value: 1000});
    }).then(function() {
      return SubmitArticleInstance.submissions.call(accounts[0]);
    }).then(function(result) {
      assert.equal(true, false, 'Failed to throw an error on second submission')
    }).catch(function(error) {
      const actualResult = Boolean(error.message.match(/already submitted/));
      const expectedResult = true
      assert.equal(actualResult, expectedResult, "The contract did not correctly store the submitted title");
    });
  });

  it("Should have functioning getters for public variables", async() => {
    let instance = await SubmitArticle.deployed();
    const options = {from: accounts[0]}
    const submissionCost = await instance.submissionCost(options);
    const owner = await instance.owner(options);
    const submittersEntry = await instance.submitters(0, options);
    const submissionsEntry = await instance.submissions(accounts[0], options);
    assert.equal(submissionCost, 1000, 'submissino Cost is not 1000');
    assert.equal(owner, accounts[0], 'owner is not accounts[0]');
    assert.equal(submittersEntry, accounts[0], 'submittersEntry is not accounts[0]');
    assert.equal(Boolean(submissionsEntry), true, 'submissionsEntry is not truthy');

  })

  it("Should allow a user to remove an article", function() {
    return SubmitArticle.deployed().then(function(instance) {
      SubmitArticleInstance = instance;

      return SubmitArticleInstance.deleteSubmission({from: accounts[0]});
    }).then(function() {
      return SubmitArticleInstance.submissions.call(accounts[0]);
    }).then(function(result) {
      const actualTitle = result[1]
      const expectedTitle = ""
      assert.equal(actualTitle, expectedTitle, "The contract did not remove the submission");
      assert.equal(result[5], false, "The contract did remove the submission");
    })
  });


  it("Should selfdestruct if killContract called by the owner", async() => {
    let instance = await SubmitArticle.deployed();
    await instance.killContract({from: accounts[0]});
    try {
      await instance.killContract({from: accounts[0]});
      assert.equal(true, false, 'Did not throw error on second try')
    } catch(e) {
      assert.equal(true, Boolean(e.message.match('is not a contract address')))
    }

  })

});

