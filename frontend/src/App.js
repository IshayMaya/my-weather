import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Main from './containers/Main/Main'
import Favorites from './containers/Favorites/Favorites'
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Switch>
          <Route path="/favorites" component={Favorites} />
          <Route path="/:cityName?" component={Main} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
