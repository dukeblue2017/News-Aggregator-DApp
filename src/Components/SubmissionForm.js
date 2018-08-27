import React from 'react';

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    const dates = this.makePossibleDates();
    this.state = {
      title: null,
      url: null,
      author: null,
      date: dates[0],
      possibleDates: dates
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
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
    const options = {
      from: this.props.account
    }

    this.props.submitArticleInstance.addArticle(this.state.title, this.state.url, this.state.author, this.state.date, options)
      .then((result) => console.log(result))
      .catch((e) => console.log(e))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="submissionForm">
        <div className="formTitle">Submit A Story:</div>
        <label>
          Title
          <input type="text" name="title" onChange={this.handleChange}/>
        </label>
        <label>
          URL
          <input type="text" name="url" onChange={this.handleChange} />
        </label>
        <label>
          Author
          <input type="text" name="author" onChange={this.handleChange} />
        </label>
        <label>
          Date<br/>
          <select name="date" value={this.state.date} onChange={this.handleChange}>
            {this.state.possibleDates.map(date => <option key={date} value={date}>{date}</option>)}
          </select>
        </label>
        <input type="submit" value="Submit Story" onChange={this.handleChange} />
      </form>
    )
  }
}

export default SubmissionForm