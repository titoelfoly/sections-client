import React, {Fragment, useEffect} from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Register from './components/Register';
import {loadUser} from './actions/authActions';
import SetAuthToken from './utils/SetAuthToken';
import {connect} from 'react-redux';
import MemoApp from './components/memos/MemosApp';
import './App.css';
import Home from './Home';

const App = props => {
  //   const { isAuthenticated, loading } = props.auth;
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  useEffect(() => {
    props.loadUser();
  }, [props.auth.loading, props.auth.isAuthenticated]);
  return (
    <Router>
      <Switch>
        <Fragment>
          <Navbar />
          <Route path="/" exact component={Home} />
          {!props.auth.isAuthenticated && <Redirect to="/login" />}
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/memos" exact component={MemoApp} />
        </Fragment>
      </Switch>
    </Router>
  );
};
const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps, {loadUser})(App);
