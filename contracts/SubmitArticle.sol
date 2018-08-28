pragma solidity ^0.4.18;

import '../installed_contracts/zeppelin/contracts/payment/PullPayment.sol';

contract SubmitArticle is PullPayment {
  // the number of Wei required to submit an article
  uint public submissionCost;

  // array of all submitter addresses, eventually to be used
  // for grabbing all Articles from mapping
  address[] public submitters;

  // uint to keep track of array insertion point
  uint currentSubmittersIndex = 0;

  event Success(string successfulOperation);

  address public owner;

  constructor() public {
    owner = msg.sender;
    submissionCost = 1000;
  }

  struct Article {
    address submitter;
    string title;
    string url;
    string author;
    string date;
    bool exists;
    uint submittersIndex;
  }

  mapping (address => Article) public submissions;

  modifier hasSubmitted() {
    require(submissions[msg.sender].exists == true, "User has not yet submitted an article.");
    _;
  }
  
  modifier hasNotSubmitted() {
    require(submissions[msg.sender].exists == false, "User has already submitted an article.");
    _;
  }

  modifier isOwner() {
    require(msg.sender == owner, "Owner is not the message sender.");
    _;
  }

  // This is the central function. Using the UI, the user can submit an
  // article, provided the requisite submissionCost is paid
  // This updates the submissions mapping and the submitters array
  function addArticle(string title, string url, string author, string date)
    public
    payable
    hasNotSubmitted
  {
    require(msg.value >= submissionCost, "Insufficient payment for a submission");
    submissions[msg.sender] = Article(msg.sender, title, url, author, date, true, currentSubmittersIndex);
    submitters.push(msg.sender);
    currentSubmittersIndex += 1;
    emit Success('article added');
  }

  // can be called from the UI to delete a user's submitted article
  // the user can resubmit afterwards, though the Article partially persists
  function deleteSubmission()
    hasSubmitted
  {
    uint index = submissions[msg.sender].submittersIndex;
    submitters[index] = address(0);
    submissions[msg.sender] = Article(msg.sender, "", "", "", "", false, index);
    emit Success('submission deleted');
  }

  function getMySubmissionUrl()
    public
    view
    hasSubmitted
    returns(string)
  {
    Article memory userSubmission = submissions[msg.sender];
    return userSubmission.url;
  }

  // calls Zeppelin's PullPayment (payee has to make a call to withdrawPayments)
  // cannot be paid out to the owner's own address
  function payout(address payoutAddress, uint256 payoutAmount)
    isOwner
  {
    require(payoutAddress != owner, "Owner cannot receive payout.");
    asyncSend(payoutAddress, payoutAmount);
  }

  function killContract()
  public
    isOwner
  {
    selfdestruct(owner);
  }

}