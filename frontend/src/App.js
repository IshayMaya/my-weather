import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Header from './components/Header/Header'
import Main from './containers/Main/Main'
import Login from './containers/Login/Login'
import Logout from './containers/Logout/Logout'
import Favorites from './containers/Favorites/Favorites'
import ErrorModal from './components/UI/ErrorModal/ErrorModal'
import './App.css';


const App = props => {
  const onError = props.isError ? <ErrorModal /> : null
  const routes = props.isAuthenticated ?
    <Switch>
      <Route path="/favorites" component={Favorites} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/:cityName?" component={Main} />
      {/* <Redirect to="/" /> */}
    </Switch> :
    <Switch>
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  return (
    <BrowserRouter>
      <div className="App">
        {onError}
        <Header isAuth={props.isAuthenticated} />
        {routes}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    isError: state.forecast.isError,
    isAuthenticated: !!state.auth.token
  };
};


export default connect(mapStateToProps, null)(App)
