import React, { Component } from 'react';
import lulu_logo from './img/lulu_cupcakes.jpg'
import './App.css';
import SearchBar from './components/search_bar.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state =({
      apiHost:`http://localhost:8111`,
      data:"this is something"
    });
    this.getState = this.getState.bind(this);
    this.render = this.render.bind(this);
    this.setState = this.setState.bind(this);
  }

  getState = () => this.state;

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={lulu_logo} alt="Credits to kirei's air."/>
          <p>
            Welcome to Nerfed.gg, we are a League of Legends statistics page like a certain Korean website with dissmiliar name, except built with nonexistant budget and a 4 hour deadline.
          </p>
          <p>
            You can think of us as a transmogulated version of that better website. One that's as useful in a teamfight as a cupcake. I wonder if I taste purple?
          </p>
          <SearchBar/>
          <br/>
        </header>
      </div>
    );
  }
}

export default App;
