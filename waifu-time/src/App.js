import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import ShowsList from './components/ShowsList';
import NavBar from './components/UI/NavBar.js';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/all-shows">
          <ShowsList />
        </Route>
        <h1>FOOTER</h1>
      </div>
    </Router>
  );
}

export default App;
