import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      items: [] 
    };
  }

  componentDidMount() {
    fetch('https://4fl03ekt7b.execute-api.us-east-1.amazonaws.com/dev/query?q=france') 
      .then(result=> {
        result.json().then(data => {
          this.setState({items:data.posts});
        });
      });
  }

  render() {
    return (
      <div className="App">
        { this.state.items.map(item=> { return <div key={item.key} className="post">{item.text}</div>}) }
      </div>
    );
  }
}

export default App;
