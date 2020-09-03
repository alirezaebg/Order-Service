import React, { Component } from 'react';
import { Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Home'
import Create from './components/Create'
import View from './components/View'

class App extends Component {

  state = {
    emailQuery: ''
  }

  handleChange = (query) => {
    this.setState({ emailQuery: query })
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <Home query={this.state.emailQuery} handleChange={this.handleChange} />
        )} />
        <Route path='/create' render={() => (
          <Create query={this.state.emailQuery} />
        )} />
        <Route path='/view'
          component={View}
        />
      </div>

    )
  }
}

export default App;
