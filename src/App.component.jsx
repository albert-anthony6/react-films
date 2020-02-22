import React from 'react';
import './App.styles.scss';
import Header from './components/header/Header.component';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/home/Home.component';
import Movie from './pages/movie/Movie.component';

function App() {
  return (
    <React.Fragment>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/:movieId" component={Movie}/>
        </Switch>
    </React.Fragment>
  );
}

export default App;
