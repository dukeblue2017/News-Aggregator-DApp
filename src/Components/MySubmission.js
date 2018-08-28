import React from 'react';

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    const dates = this.makePossibleDates();
    this.state = {
      date: dates[0],
      possibleDates: dates,
      displayedSubmission: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchMySubmission()
  }

  makePossibleDates() {
    const dates = [];
    const millisecondsInADay = 1000 * 60 * 60 * 24
    for (let i = 0; i < 5; i += 1) {
      const date = new Date(Date.now() + i * millisecondsInADay)
      const dateStr = `${date.toLocaleString('en-us', {weekday: 'long'})} ${date.toLocaleString('en-us', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`
      dates.push(dateStr)
    }
    return dates;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchMySubmission();
  }

  fetchMySubmission() {
    const options = {
      from: this.props.account
    }
    this.props.submitArticleInstance.submissions.call(options.from, options)
      .then((result) => {
        console.log(result)
        const submissionExists = result[5];
        if (submissionExists) {
          this.setState({
            displayedSubmission: {
              title: result[1],
              url: result[2],
              author: result[3],
              date: result[4],
            }
          })
        }
      })
      .catch((e) => console.log(e))
  }

  render() {
    return (
      <div className='mySubmissionContainer'>
        <form onSubmit={this.handleSubmit} className='mySubmission'>
          <select name="date" value={this.state.date} onChange={this.handleChange}>
            {this.state.possibleDates.map(date => <option key={date} value={date}>{date}</option>)}
          </select>
          <br/>
          <input type="submit" value="See My Submission" onChange={this.handleChange} />
        </form>
        
        {this.state.displayedSubmission &&
          <table className='mySubmissionTable'>
            <tbody>
              <tr>
                <td>Title:</td>
                <td>{this.state.displayedSubmission.title}</td>
              </tr>
              <tr>
                <td>URL:</td>
                <td>
                  <a href={this.state.displayedSubmission.url}>{this.state.displayedSubmission.url}</a>
                </td>
              </tr>
              <tr>
                <td>Author:</td>
                <td>{this.state.displayedSubmission.author}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{this.state.displayedSubmission.date}</td>
              </tr>
            </tbody>
          </table>
        }

      </div>
    )
  }
}

export default SubmissionForm