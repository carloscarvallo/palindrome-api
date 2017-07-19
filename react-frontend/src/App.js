import React, { Component } from 'react';
import jQuery from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value : '',
      message : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange( event ) {
    this.setState({ value: event.target.value });
  }

  handleSubmit( event ) {
    jQuery.ajax({
      type: 'GET',
      url: 'https://carloscarvallo.me/api/palindromes?q='+ this.state.value,
      //url: 'http://localhost:3001/api/palindromes?q='+ this.state.value,
      success: function( data ) {
        this.setState({ message: data.message });
      }.bind(this),
      error: function( err ) {
        this.setState({ message: err.responseJSON.message });
      }.bind(this)
    })
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Word:
            <br/>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br/>
        <input type="submit" value="Submit" />
        <br/>
        <label onChange={this.handleChange}>{this.state.message}</label>
      </form>
    );
  }
}

export default App;
