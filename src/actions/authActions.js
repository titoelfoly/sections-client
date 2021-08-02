import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
import axios from "axios";
import SetAuthToken from "../utils/SetAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://18.118.103.130:5000/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
    console.log("user loaded");
  } catch (err) {
    console.error(err.message);
  }
};
export const logout = () => async (dispatch) => {
    SetAuthToken(null)
  dispatch({ type: LOGOUT });
};

export const userLogin = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://18.118.103.130:5000/api/auth",
      formData,
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://18.118.103.130:5000/api/users",
      formData,
      config
    );
    console.log(res);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};
