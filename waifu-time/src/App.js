import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import ShowsList from './components/ShowsList';
import NavBar from './components/UI/NavBar.js';
import ShowInfo from './components/ShowInfo';
import Renderer from './Renderer';
import DownloadManager from './components/DownloadManager';
import './App.css';

// TODO: BUG when a file is already downloaded it doesn't redirect correctly
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/all-shows">
          <ShowsList />
        </Route>
        <Route exact path="/player" component={Renderer} />
        <Route exact path="/show/:title">
          <ShowInfo />
        </Route>

        <Route exact path="/manage-downloads">
          <DownloadManager />
        </Route>
      </div>
    </Router>
  );
}

export default App;
