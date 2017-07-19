import React, { Component } from 'react';
import jQuery from 'jquery';

function AlertLabel( props ) {
  return <label className={`alert alert-dismissible ${props.typeAlert}`}>{props.message}</label>
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value : '',
      message : '',
      showLabel : false,
      typeAlert : null
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
      //url: 'https://carloscarvallo.me/api/palindromes?q='+ this.state.value,
      url: 'http://localhost:3001/api/palindromes?q='+ this.state.value,
      success: function( data ) {
        this.setState({
          message: data.message,
          typeAlert: "alert-info"
        });
      }.bind(this),
      error: function( err ) {
        this.setState({
          message: err.responseJSON.message,
          typeAlert: "alert-warning"
        });
      }.bind(this)
    })
    event.preventDefault();
    this.setState({ showLabel: true });
  }

  render() {
    return (
      <div className="jumbotron container-fluid">
      <form onSubmit={this.handleSubmit}>
        <label>
          Insert your Palidrome here!
            <br/>
            <br/>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br/>
        <br/>
        <input type="submit" value="Submit" />
        <br/>
        <br/>
        {this.state.showLabel ? <AlertLabel message={this.state.message} typeAlert={this.state.typeAlert} /> : null}
      </form>
    </div>
    );
  }
}

export default App;
