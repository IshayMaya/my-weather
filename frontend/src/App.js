import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import { connect } from 'react-redux';
import Header from './components/Header/Header'
import Main from './containers/Main/Main'
import Favorites from './containers/Favorites/Favorites'
import ErrorModal from './components/UI/ErrorModal/ErrorModal'
import './App.css';


const  App = props =>  {
  let onError = props.isError ? <ErrorModal /> : null
  return (
    <BrowserRouter>
    <div className="App">
      {onError}
      <Header />
      <Switch>
          <Route path="/favorites" component={Favorites} />
          <Route path="/:cityName?" component={Main} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
      isError: state.forecast.isError,
  };
};


export default connect(mapStateToProps, null)(App)
