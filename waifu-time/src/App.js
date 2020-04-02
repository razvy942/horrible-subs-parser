import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import ShowsList from './components/ShowsList';
import NavBar from './components/UI/NavBar.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/all-shows'>
          <ShowsList />
        </Route>
      </div>
    </Router>
  );
}

export default App;
