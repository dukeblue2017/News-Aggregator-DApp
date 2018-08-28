pragma solidity ^0.4.18;

contract SubmitArticle {
  address[] public submitters;

  event Success(bool didSucceed);

  address owner;

  constructor() {
    owner = msg.sender;
  }

  struct Article {
    address submitter;
    string title;
    string url;
    string author;
    string date;
    bool exists;
  }

  mapping (address => Article) public submissions;

  modifier hasSubmitted() {
    require(submissions[msg.sender].exists == true);
    _;
  }
  
  modifier hasNotSubmitted() {
    require(submissions[msg.sender].exists == false, "User has already submitted an article");
    _;
  }

  modifier isOwner() {
    require(msg.sender == owner);
    _;
  }

  function addArticle(string title, string url, string author, string date)
    public
    hasNotSubmitted
  {
    submissions[msg.sender] = Article(msg.sender, title, url, author, date, true);
    submitters.push(msg.sender);
    emit Success(true);
  }

  function getMySubmission()
    public
    view
    hasSubmitted
    returns(string)
  {
    Article memory userSubmission = submissions[msg.sender];
    return userSubmission.url;
  }
}