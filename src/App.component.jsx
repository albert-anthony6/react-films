import React from 'react';
import './App.styles.scss';
import Header from './components/header/Header.component';
import Home from './pages/home/Home.component';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
    </React.Fragment>
  );
}

export default App;
