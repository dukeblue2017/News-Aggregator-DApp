import React, { Component } from 'react'
import SubmitArticleContract from '../build/contracts/SubmitArticle.json'
import getWeb3 from './utils/getWeb3'
import SubmissionForm from './Components/SubmissionForm'
import MySubmission from './Components/MySubmission'


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      account: null,
      submitArticleInstance: null
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  async instantiateContract() {
    const contract = require('truffle-contract')
    const submitArticle = contract(SubmitArticleContract)
    submitArticle.setProvider(this.state.web3.currentProvider)

    var submitArticleInstance
    submitArticle.deployed().then((instance) => {
      submitArticleInstance = instance
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.setState({
          submitArticleInstance,
          account: accounts[0]
        })
      })
    }).catch((e) => console.log(e))
  }

  render() {
    return (
      <div className="App">
        <div className="storiesOfTheDay">Stories of the Day</div>
        {this.state.account && <div className="yourAddress">Your Address: {this.state.account}</div>}
        {this.state.submitArticleInstance && <MySubmission account={this.state.account} submitArticleInstance={this.state.submitArticleInstance}/>}
        <SubmissionForm account={this.state.account} submitArticleInstance={this.state.submitArticleInstance} />
      </div>
    );
  }
}

export default App
