import React, { Component } from 'react';
import {TestComponent, FilterableProductTable} from './ProductTable'
import {Snippet} from './Snippet'
import logo from './logo.svg';
import './App.css';

var initialProducts = [
    { name : "A Product", price : 30, enabled : true},
    { name : "Another Product", price : 30, enabled : true},
    { name : "Cats", price : 30, enabled : true},
  ];

class App extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <Snippet />
        </div>
      </div> 
    );
  }
}

export default App;
