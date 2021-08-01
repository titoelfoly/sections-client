import React, { Fragment, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import { loadUser } from "./actions/authActions";
import SetAuthToken from "./utils/SetAuthToken";
import { connect } from "react-redux";
import MemoApp from "./components/memos/MemosApp";
import "./App.css";

const App = (props) => {
  //   const { isAuthenticated, loading } = props.auth;
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  useEffect(() => {
    props.loadUser();
  }, [props.auth.loading]);
  return (
    <Router>
      <Fragment>
        <Switch>
          <Fragment>
            <Navbar />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/memos" component={MemoApp} />
          </Fragment>
        </Switch>
      </Fragment>
    </Router>
  );
};
const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { loadUser })(App);
