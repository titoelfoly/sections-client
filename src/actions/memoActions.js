import {
  GET_SECTIONS,
  DELETE_SECTION_SUCCESS,
  DELETE_SUBSECTION,
  DELETE_MEMO,
  ADD_SECTION_SUCCESS,
  SECTION_SELECTED,
  ADD_SUBSECTION_SUCCESS,
  GET_SUBSECTIONS,
  SUBSECTION_SELECTED,
  ADD_MEMO,
  GET_MEMOS,
  GET_MEMO,
  ADD_SECTION_FAILED,
  CLEAR_ERRORS,
  CLOSE_FORM,
  OPEN_FORM,
  SELECT_NONE,
} from "./types";
import axios from "axios";

export const addSection = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://18.118.103.130:5000/api/sections",
      data,
      config
    );
    dispatch({ type: ADD_SECTION_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: ADD_SECTION_FAILED, payload: err.response.data });
  }
};
export const getSections = () => async (dispatch) => {
  try {
    const res = await axios.get("http://18.118.103.130:5000/api/sections");
    dispatch({ type: GET_SECTIONS, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};

export const selectSection = (data) => async (dispatch) => {
  try {
    dispatch({ type: SECTION_SELECTED, payload: data });
  } catch (err) {
    console.error(err.message);
  }
};
export const selectSubSection = (data) => async (dispatch) => {
  try {
    dispatch({ type: SUBSECTION_SELECTED, payload: data });
  } catch (err) {
    console.error(err.message);
  }
};
export const addSubSection = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://18.118.103.130:5000/api/subSections",
      data,
      config
    );
    dispatch({ type: ADD_SUBSECTION_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ ADD_SECTION_FAILED });
  }
};
export const addMemo = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://18.118.103.130:5000/api/memos",
      data,
      config
    );
    dispatch({ type: ADD_MEMO, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};
export const getSubSections = (id) => async (dispatch) => {
  const params = {
    id: id,
  };
  try {
    const res = await axios.get("http://18.118.103.130:5000/api/subSections", {
      params,
    });
    dispatch({ type: GET_SUBSECTIONS, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};
export const getMemos = (id) => async (dispatch) => {
  const params = {
    id,
  };
  try {
    const res = await axios.get("http://18.118.103.130:5000/api/memos", {
      params,
    });
    dispatch({ type: GET_MEMOS, payload: res.data });
  } catch (err) {
    console.error(err.message);
  }
};
export const getMemo = (id) => async (dispatch) => {
  console.log("action getMemo");
  dispatch({ type: GET_MEMO, payload: id });
};

export const clearSectionErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
export const deleteSection = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://18.118.103.130:5000/api/sections/${id}`);
    dispatch({ type: DELETE_SECTION_SUCCESS, payload: id });
  } catch (err) {
    console.error(err.message);
  }
};
export const deleteSubSection = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://18.118.103.130:5000/api/subSections/${id}`);
    dispatch({ type: DELETE_SUBSECTION, payload: id });
  } catch (err) {}
};
export const deleteMemo = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://18.118.103.1305000/api/memos/${id}`);
    dispatch({ type: DELETE_MEMO, payload: id });
    console.log("deleted");
  } catch (err) {
    console.error(err.message);
  }
};
export const openForm = () => async (dispatch) => {
  try {
    dispatch({ type: OPEN_FORM });
  } catch (err) {
    console.error(err.message);
  }
};
export const closeForm = () => async (dispatch) => {
  try {
    dispatch({ type: CLOSE_FORM });
  } catch (err) {
    console.error(err.message);
  }
};
export const selectNone = () => async (dispatch) => {
  try {
    dispatch({ type: SELECT_NONE });
  } catch (err) {
    console.error(err.message);
  }
};
