import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Dashboard from './components/Dashboard/Dashboard';
import Search from './components/Search/Search';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div> */}
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/search" component={Search}/>
        </Switch>
      </div>
    );
  }
}

export default App;
