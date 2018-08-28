## Foundations of a News Aggregator DApp
### Users share definitive news stories with a smart contract and receive compensation for sharing stories that become highly ranked. The aim is to cut out the noise in news content by democratizing its aggregation.

#### Steps to start the app:

1. Clone the repository
1. `npm install`
1. `ganache-cli` to start a development blockchain
1. `truffle compile`
1. `truffle migrate` to migrate the contract to the ganache development blockchain.

To start in development on port 3000:
* `npm run start`

To start in production on port 5000:
* `npm run build`
* `npm run server`

####
This app is an implementation of some fundamental features of a conceived larger project. That larger project envisions users who are confirmed to be unique (either via a traditional or smart-contract infrastructure) submitting links to a strictly limited number of definitive news articles each day. These articles are then curated by popularity (and potentially across other dimensions as well), and there is a financial reward for the submission of an article that ends up being ranked highly.

Implemented here is a user interface that interacts with a smart contract to keep track of a user's submitted article. I have attempted to architect this otherwise basic set of features with an eye towards scalability and the more challenging demands and scope of the project at large.

In the React based user interface (built on top of the Truffle React Box), you can submit a news story's:
* title
* author
* url
* date (not yet used)

Upon clicking the button to submit, the user is prompted by Metamask to interface with the smart contract `SubmitArticle`. The initial submission requires a certain amount of Ether (currently 1000 Wei), and the idea is that incentives can be structured such that it is to the user's advantage to act truthfully and honestly in the submission of definitive stories. Though the payout logic has not yet been implemented, a payout function has. This will be discussed further in the other documents.

Though I have worked on a UI for this app idea before, I have elected to start from scratch in building this repository, both for educational purposes as well as for the sake of orienting the app around blockchain integration.

Test with `truffle test`