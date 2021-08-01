import { combineReducers } from "redux";
import authReducer from "./authReducer";
import memoReducer from "./memoReducer";

export default combineReducers({
  auth: authReducer,
  memos: memoReducer,
});
