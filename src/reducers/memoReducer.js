import {
  GET_SECTIONS,
  ADD_SECTION_SUCCESS,
  ADD_SECTION_FAILED,
  ADD_SUBSECTION_SUCCESS,
  ADD_MEMO,
  SECTION_SELECTED,
  GET_SUBSECTIONS,
  GET_MEMOS,
  SUBSECTION_SELECTED,
  GET_MEMO,
  CLEAR_ERRORS,
  DELETE_SECTION_SUCCESS,
  DELETE_SUBSECTION,
  DELETE_MEMO,
  CLOSE_FORM,
  OPEN_FORM,
  SELECT_NONE,
} from "../actions/types";

const initialState = {
  sections: [],
  selectedSectionId: null,
  sectionSelected: false,
  sectionSelectedName: "",
  subSections: [],
  selectedSubSectionId: null,
  subSectionSelectedName: "",
  subSectionSelected: false,
  memos: [],
  memoContent: "",
  selectedMemoId: null,
  memoSelected: false,
  memo: {},
  memoSelectedName: "",
  loading: false,
  error: null,
  msg: null,
  currentSelected: { name: null, domain: "Sections" },
  isOpen: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SECTIONS:
      return {
        ...state,
        sections: action.payload,
      };
    case SECTION_SELECTED:
      return {
        ...state,
        selectedSectionId: action.payload._id,
        sectionSelectedName: action.payload.name,
        sectionSelected: true,
        subSectionSelected: false,
        selectedSubSectionId: null,
        currentSelected: { name: action.payload.name, domain: "SubSections" },
      };
    case GET_SUBSECTIONS:
      return {
        ...state,
        subSections: action.payload,
      };
    case GET_MEMOS:
      return {
        ...state,
        memos: action.payload,
      };
    case ADD_SECTION_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        error: null,
        sections: [...state.sections, action.payload[1]],
        msg: action.payload[0].msg,
      };
    case ADD_SECTION_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_SUBSECTION_SUCCESS:
      return {
        ...state,
        subSections: [...state.subSections, action.payload],
      };
    case DELETE_MEMO:
      return {
        ...state,
        memos: state.memos.filter((memo) => memo._id !== action.payload),
      };
    case DELETE_SECTION_SUCCESS:
      //TODO: actually i have to delete the subsection and memo too if they are exists
      return {
        ...state,
        sections: state.sections.filter(
          (section) => section._id !== action.payload
        ),
        memos: state.memos.filter((memo) => {
          state.subSections.filter(
            (subsection) => memo.subsection !== subsection._id
          );
        }),
        subSections: state.subSections.filter(
          (subsection) => subsection.section !== action.payload
        ),
      };
    case DELETE_SUBSECTION:
      return {
        ...state,
        memos: state.memos.filter((memo) => memo.subsection !== action.payload),
        subSections: state.subSections.filter(
          (subSection) => subSection._id !== action.payload
        ),
      };

    case ADD_MEMO:
      return {
        ...state,
        memos: [...state.memos, action.payload],
      };
    case SUBSECTION_SELECTED:
      return {
        ...state,
        selectedSubSectionId: action.payload._id,
        subSectionSelectedName: action.payload.name,
        sectionSelected: false,
        subSectionSelected: true,
        memoSelected: false,
        currentSelected: { name: action.payload.name, domain: "Memos" },
      };
    case GET_MEMO:
      console.log("dispatching");
      return {
        ...state,
        memo: state.memos.filter((memo) => memo._id === action.payload)[0],
        memoSelected: true,
        selectedMemoId: action.payload,
        subSectionSelected: false,
        currentSelected: {
          name: state.memos.filter((memo) => memo._id === action.payload)[0]
            .name,
          domain: "Memo",
        },
        memoContent: state.memos.filter(
          (memo) => memo._id === action.payload
        )[0].content,
      };
    case SELECT_NONE:
      return {
        ...state,
        sectionSelected: false,
        subSectionSelected: false,
        memoSelected: false,
        sectionSelectedName: "",
        subSectionSelectedName: "",
        memoSelectedName: "",
        currentSelected: { name: null, domain: "Sections" },
      };
    case OPEN_FORM:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_FORM: {
      return {
        ...state,
        isOpen: false,
      };
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
