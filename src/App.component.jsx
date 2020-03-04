import React from 'react';
import './App.styles.scss';
import Header from './components/header/Header.component';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/home/Home.component';
import Movie from './pages/movie/Movie.component';
import Category from './pages/category/Category.component';

function App() {
  return (
    <React.Fragment>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/movie/:movieId" component={Movie}/>
          <Route exact path="/category/:categoryId" component={Category}/>
        </Switch>
    </React.Fragment>
  );
}

export default App;
