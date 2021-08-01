import { makeStyles } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser, logout } from "../actions/authActions";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
  root: {},
  label: {},
  loginBTN: { marginLeft: "auto" },
  container: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
  },
  info: {
    display: "flex",
    justifyContent: "center",
  },
  nav: {
    backgroundColor: "#3A3B3C",
  },
});

const Navbar = (props) => {
  const { isAuthenticated, user, loading } = props.auth;
  const history = useHistory();
  const onClickLogin = useCallback(() => {
    history.push("/login");
  }, [history]);
  const onClickMemoApp = useCallback(() => {
    history.push("/memos");
  }, [history]);
  const onLogout = () => {
    props.logout();
    history.push("/");
  };
  useEffect(() => {}, [isAuthenticated, user, loading]);
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" className={classes.nav}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Button
            onClick={onClickMemoApp}
            color="inherit"
            className={classes.loginBTN}
          >
            MemoApp
          </Button>
          {!isAuthenticated && (
            <Button
              onClick={onClickLogin}
              color="inherit"
              className={classes.loginBTN}
            >
              Login
            </Button>
          )}
          {isAuthenticated && (
            <div className={classes.container}>
              <Button
                onClick={onLogout}
                color="secondary"
                className={classes.loginBTN}
              >
                Logout
              </Button>
              <div className={classes.info}>
                <AccountCircle></AccountCircle>
                {user && <Typography>{user.name}</Typography>}
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, { loadUser, logout })(Navbar);
