import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  state = {
    input: "Hello"
  }

  updateInput = (event) => {
    console.log(event.target.value)
    this.setState({
      input: event.target.value.trim()
    })
  }
  submit = ()=> {
     console.log(this.text.value)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text="Welcome to Using Props"/>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.submit}> Show Value </button>
        <input type="text" onChange={this.updateInput} value={this.state.input}/>
        <input type="text" ref={(input)=> this.text = input }/>
      </div>
    );
  }
} 

class Welcome extends Component {
  render() {
    const { text } = this.props;
    return (
      <h1 className="App-title">{text}</h1>
    )
  }
}

export default App;
