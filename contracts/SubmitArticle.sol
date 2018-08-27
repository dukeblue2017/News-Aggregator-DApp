pragma solidity ^0.4.18;

contract SubmitArticle {
  string[] titles;
  event Success(bool didSucceed);

  function addTitle(string title)
    public
    returns (bool)
  {
    titles.push(title);
    emit Success(true);
  }
}