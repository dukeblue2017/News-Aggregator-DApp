import React, { Component } from 'react'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import SubmitArticleContract from '../build/contracts/SubmitArticle.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      contract: null,
      account: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  async instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const submitArticle = contract(SubmitArticleContract)
    submitArticle.setProvider(this.state.web3.currentProvider)

    var submitArticleInstance
    
    this.state.web3.eth.getAccounts((error, accounts) => {
      submitArticle.deployed().then((instance) => {
        submitArticleInstance = instance
        const options = {
          from: accounts[0]
        }
        return submitArticleInstance.addTitle("news story", options)
          .then((result) => console.log(result))
          .catch((e) => console.log(e))
      })
    })
  }

  handleClick(event) {
    const contract = this.state.contract
    const account = this.state.account
    var value = 3;
    contract.set(value, {from: account})
      .then(result => {
        return contract.get.call()
      }).then(result => {
        return this.setState({storageValue: result.c[0]})
      })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
              <button onClick={this.handleClick.bind(this)}>Set Storage</button>
            </div>
          </div>
        </main>
        <div className="storiesOfTheDay">
          {'Stories of the Day'}
        </div>
      </div>
    );
  }
}

export default App