pragma solidity ^0.4.18;

contract SubmitArticle {
  address[] public submitters;
  event Success(bool didSucceed);
  struct Article {
    address submitter;
    string title;
    string url;
    string author;
    string date;
  }
  mapping (address => Article) public submissions;

  function addArticle(string title, string url, string author, string date)
    public
  {
    submissions[msg.sender] = Article(msg.sender, title, url, author, date);
    submitters.push(msg.sender);
    emit Success(true);
  }
}