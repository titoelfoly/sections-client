import React, { useState, Fragment, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../actions/authActions";
import styles from "./styles";
import { FormControl, Typography, TextField, Button } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Register = (props) => {
  const classes = styles();
  const history = useHistory();
  const navigateToLogin = useCallback(() => {
    history.push("/login");
  }, [history]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { isAuthenticated, error } = props.auth;
  const { name, email, password, password2 } = user;
  const [errors, setErrors] = useState({ errors: "" });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    if (name === "" || email === "" || password === "" || password2 === "") {
      setErrors({ errors: "Please Enter All Fields" });
    } else if (password !== password2) {
      setErrors({ errors: "Password1 Not Equal Password2" });
    }
    e.preventDefault();
    props.register(user);
  };
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    console.log(error);
  }, [isAuthenticated, error]);
  return (
    <Fragment>
      <div className={classes.frag}>
        <div className={classes.container}>
          <FormControl className={classes.formControl}>
            <Typography className={classes.title}>Register</Typography>
            {errors.errors !== "" && (
              <Typography className={classes.errors}>
                {errors.errors}
              </Typography>
            )}
            {errors && (
              <Typography className={classes.errors}>{error}</Typography>
            )}
            <div className={classes.registerFields}>
              <div className={classes.fieldRow}>
                <AccountCircleIcon className={classes.icon} />
                <TextField
                  type="text"
                  name="name"
                  label="Type Name"
                  variant="outlined"
                  value={name}
                  onChange={onChange}
                  required
                  inputProps={{ className: classes.textField }}
                  InputLabelProps={{ className: classes.textField }}
                ></TextField>
              </div>
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
              <div className={classes.fieldRow}>
                <LockIcon className={classes.icon} />
                <TextField
                  type="password"
                  name="password2"
                  required
                  minLength="6"
                  value={password2}
                  onChange={onChange}
                  label="Type Password again"
                  variant="outlined"
                  inputProps={{ className: classes.textField }}
                  InputLabelProps={{ className: classes.textField }}
                ></TextField>
              </div>
            </div>
            <Button type="submit" className={classes.btn} onClick={onSubmit}>
              Register
            </Button>

            <Button onClick={navigateToLogin} className={classes.btn}>
              Login
            </Button>
          </FormControl>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { register })(Register);
