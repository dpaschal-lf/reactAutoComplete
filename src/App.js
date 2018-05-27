import React, { Component } from 'react';
import './App.css';
import AutoCompleteInput from './components/autocompleteInput/autocompleteinput';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="App">
      	<AutoCompleteInput />
      </div>
    );
  }
}

export default App;










