import {
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUser, userLogin } from "../actions/authActions";
import styles from "./styles";

const Login = (props) => {
  const history = useHistory();
  const navigateToRegister = useCallback(() => {
    history.push("/register");
  }, [history]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { isAuthenticated } = props.auth;
  const { email, password } = user;
  const classes = styles();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    props.userLogin(user);
    props.loadUser();
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated]);
  return (
    <Fragment>
      <div className={classes.frag}>
        <div className={classes.container}>
          <FormControl className={classes.formControl}>
            <Typography className={classes.title}>Login</Typography>
            <div className={classes.fields}>
              <div className={classes.fieldRow}>
                <EmailIcon className={classes.icon} />
                <TextField
                  type="email"
                  name="email"
                  label="Type Email"
                  variant="outlined"
                  value={email}
                  onChange={onChange}
                  required
                  className={classes.textField}
                  inputProps={{ className: classes.textField }}
                  InputLabelProps={{ className: classes.textField }}
                ></TextField>
              </div>
              <div className={classes.fieldRow}>
                <LockIcon className={classes.icon} />
                <TextField
                  type="password"
                  name="password"
                  required
                  minLength="6"
                  value={password}
                  onChange={onChange}
                  label="Type Password"
                  variant="outlined"
                  inputProps={{ className: classes.textField }}
                  InputLabelProps={{ className: classes.textField }}
                ></TextField>
              </div>
            </div>
            <Button type="submit" className={classes.btn} onClick={onSubmit}>
              Login
            </Button>

            <Button onClick={navigateToRegister} className={classes.btn}>
              Register
            </Button>
          </FormControl>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { userLogin, loadUser })(Login);
