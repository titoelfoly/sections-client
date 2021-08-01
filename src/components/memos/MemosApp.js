import { Button, Typography } from "@material-ui/core";
import React, { Fragment, memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getSections,
  openForm,
  closeForm,
  selectNone,
} from "../../actions/memoActions";

import Sections from "./Sections";
import SubSections from "./SubSections";
import Memos from "./Memos";
import styles from "./styles";
import AddIcon from "@material-ui/icons/Add";
import AddForm from "./AddForm";
import MemoContent from "./MemoContent";

const MemoApp = (props) => {
  const classes = styles();
  const sections = props.sections;
  const { subSectionSelected, sectionSelected, memoSelected, currentSelected } =
    props;
  // const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    props.getSections();
    console.log(props.memo);
  }, [
    props.auth.isAuthenticated,
    subSectionSelected,
    sectionSelected,
    memoSelected,
    currentSelected,
    props.isOpen,
    props.memo,
  ]);
  const onClickAdd = () => {
    props.openForm();
  };
  const onClickBack = () => {
    props.selectNone();
  };
  return (
    <Fragment>
      {props.auth.isAuthenticated && (
        <div className={classes.frag}>
          {props.isOpen && <AddForm></AddForm>}
          {!props.isOpen && (
            <div className={classes.container}>
              <div className={classes.dataHolder}>
                {currentSelected.domain === "SubSections" ? (
                  <Typography className={classes.title}>
                    {currentSelected.domain} of {currentSelected.name}
                  </Typography>
                ) : currentSelected.domain === "Memos" ? (
                  <Typography className={classes.title}>
                    {currentSelected.domain} of {currentSelected.name}
                  </Typography>
                ) : currentSelected.domain === "Memo" ? (
                  <Typography className={classes.title}>
                    Content of {currentSelected.name}
                  </Typography>
                ) : (
                  <Typography className={classes.title}>
                    {currentSelected.domain}
                  </Typography>
                )}

                {props.sectionSelected ? (
                  props.subSections.map((subSection) => (
                    <SubSections
                      key={subSection._id}
                      id={subSection._id}
                      name={subSection.name}
                    />
                  ))
                ) : props.subSectionSelected ? (
                  props.memos.map((memo) => (
                    <Memos key={memo._id} id={memo._id} name={memo.name} />
                  ))
                ) : props.memoSelected ? (
                  <MemoContent
                    id={props.memo._id}
                    name={props.memo.name}
                    content={props.memo.content}
                  ></MemoContent>
                ) : (
                  sections.map((section) => (
                    <Sections
                      key={section._id}
                      id={section._id}
                      name={section.name}
                    ></Sections>
                  ))
                )}
              </div>
              <div onClick={onClickBack} className={classes.mainBtns}>
                <Button className={classes.addButton}>Back</Button>

                <div onClick={onClickAdd} className={classes.addButton}>
                  <AddIcon />
                  <Typography>Add</Typography>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sections: state.memos.sections,
  sectionSelected: state.memos.sectionSelected,
  sectionSelectedName: state.memos.sectionSelectedName,
  subSections: state.memos.subSections,
  subSectionSelected: state.memos.subSectionSelected,
  subSectionSelectedName: state.memos.sectionSelectedName,
  memos: state.memos.memos,
  memoSelected: state.memos.memoSelected,
  memoSelectedName: state.memos.memoSelectedName,
  currentSelected: state.memos.currentSelected,
  isOpen: state.memos.isOpen,
  memo: state.memos.memo,
});
export default connect(mapStateToProps, {
  getSections,
  openForm,
  closeForm,
  selectNone,
})(MemoApp);
