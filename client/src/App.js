import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Home'
import Create from './components/Create'
import View from './components/View'

class App extends Component {
  render() {
    return(
      <div className="App">
        <Route exact path = '/'
          component={Home}
        />
        <Route path='/create'
          component = {Create}
        />
        <Route path='/view'
          component = {View}
        />
      </div>
      
    )
  }
}

export default App;
