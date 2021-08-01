import React, { useState, Fragment, useEffect } from "react";
import Select from "react-select";
import styles from "./styles";
import { connect } from "react-redux";
import { getSubSections } from "../../actions/memoActions";
import { Typography, TextField, Button, FormControl } from "@material-ui/core";
import {
  closeForm,
  addSection,
  addSubSection,
  addMemo,
} from "../../actions/memoActions";

import AddIcon from "@material-ui/icons/Add";

const AddForm = (props) => {
  const [sectionName, setSectionName] = useState({ name: "" });
  const [subSectionName, setSubSectionName] = useState({
    name: "",
    section: "",
  });
  const [memo, setMemo] = useState({
    id: "",
    name: "",
    content: "",
  });
  const classes = styles();
  const [addSwitch, setAddSwitch] = useState({ name: null });
  const onSectionSubmit = (e) => {
    e.preventDefault();
    props.addSection(sectionName);
    props.closeForm();
  };
  const onSubSectionSubmit = (e) => {
    e.preventDefault();
    props.addSubSection({
      name: subSectionName.name,
      section: subSectionName.section,
    });
    props.closeForm();
  };
  const onMemoSubmit = (e) => {
    e.preventDefault();
    props.addMemo({
      name: memo.name,
      id: memo.id,
      content: memo.content,
    });

    props.closeForm();
  };
  const onClickAddSection = () => {
    setAddSwitch("AddSection");
  };
  const onClickAddSubSection = () => {
    setAddSwitch("AddSubSection");
  };
  const onClickAddMemo = () => {
    setAddSwitch("AddMemo");
  };

  const onClickBack = () => {
    props.closeForm();
  };
  const handleChangeRelationSections = (selectedOption) => {
    console.log(selectedOption);
    setSubSectionName({ ...subSectionName, section: selectedOption.value });
    props.getSubSections(selectedOption.value);
    //  setFieldValue(`relation[${index}]`, selectedOption);
    // formik.setFieldValue('firstSmoker', selectedOption)
  };
  const handleChangeRelationSubSections = (selectedOption) => {
    setMemo({ ...subSectionName, id: selectedOption.value });

    //  setFieldValue(`relation[${index}]`, selectedOption);
    // formik.setFieldValue('firstSmoker', selectedOption)
  };

  useEffect(() => {}, [subSectionName, memo, addSwitch]);
  return (
    <Fragment>
      <div className={classes.container}>
        {addSwitch === "AddSection" ? (
          <div className={classes.formfields}>
            <FormControl className={classes.formControl}>
              <div className={classes.formDiv}>
                <Typography className={classes.typoText}>
                  Section Name:
                </Typography>
                <TextField
                  onChange={(e) => {
                    setSectionName({
                      ...sectionName,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  className={classes.textAddField}
                  type="text"
                  label="Type Section Name"
                  variant="outlined"
                  name="name"
                ></TextField>
              </div>
              <div className={classes.mainBtnsform}>
                <Button onClick={onClickBack} className={classes.addButton}>
                  Back
                </Button>
                <div
                  type="submit"
                  onClick={onSectionSubmit}
                  className={classes.addButton}
                >
                  <AddIcon />
                  <Typography>Add Section</Typography>
                </div>
              </div>
            </FormControl>
          </div>
        ) : addSwitch === "AddSubSection" ? (
          <div className={classes.formfields}>
            <FormControl>
              <div>
                <div className={classes.selectContainer}>
                  <Typography className={classes.typoText}>
                    Choose Section
                  </Typography>

                  <Select
                    className={classes.selectDiv}
                    onChange={(selectedOption) =>
                      handleChangeRelationSections(selectedOption)
                    }
                    options={props.sections.map((section) => ({
                      value: section._id,
                      label: section.name,
                    }))}
                    defaultValue={props.sections[0]._id}
                  ></Select>
                </div>
                <div className={classes.formDiv}>
                  <Typography className={classes.typoText}>
                    Subsection
                  </Typography>
                  <TextField
                    className={classes.textAddField}
                    onChange={(e) => {
                      setSubSectionName({
                        ...subSectionName,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    type="text"
                    label="Type Section Name"
                    variant="outlined"
                    name="name"
                  ></TextField>
                </div>
              </div>
              <div className={classes.navigationBtns}>
                <Button
                  variant="outlined"
                  type="submit"
                  onClick={onSubSectionSubmit}
                  className={classes.addButton}
                >
                  <AddIcon />
                  <Typography>Add SubSection</Typography>
                </Button>
                <Button
                  onClick={onClickBack}
                  className={classes.addButton}
                  variant="outlined"
                >
                  Back
                </Button>
              </div>
            </FormControl>
          </div>
        ) : addSwitch === "AddMemo" ? (
          <div className={classes.formfields}>
            <FormControl>
              <div>
                <div className={classes.selectContainer}>
                  <Typography className={classes.typoText}>
                    Choose Section
                  </Typography>

                  <Select
                    className={classes.selectDiv}
                    onChange={(selectedOption) =>
                      handleChangeRelationSections(selectedOption)
                    }
                    options={props.sections.map((section) => ({
                      value: section._id,
                      label: section.name,
                    }))}
                    defaultValue={props.sections[0]._id}
                  ></Select>
                </div>
                <div className={classes.selectContainer}>
                  <Typography className={classes.typoText}>
                    Choose SubSection
                  </Typography>

                  <Select
                    className={classes.selectDiv}
                    onChange={(selectedOption) =>
                      handleChangeRelationSubSections(selectedOption)
                    }
                    options={props.subSections.map((subSection) => ({
                      value: subSection._id,
                      label: subSection.name,
                    }))}
                  ></Select>
                </div>
                <TextField
                  className={classes.textAddField}
                  onChange={(e) => {
                    setMemo({
                      ...memo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  type="text"
                  label="Type Memo Name"
                  variant="outlined"
                  name="name"
                ></TextField>
                <TextField
                  className={classes.textAddField}
                  onChange={(e) => {
                    setMemo({
                      ...memo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  type="text"
                  label="Type Memo Content"
                  variant="outlined"
                  name="content"
                ></TextField>
              </div>
              <div className={classes.navigationBtns}>
                <Button
                  variant="outlined"
                  type="submit"
                  onClick={onMemoSubmit}
                  className={classes.addButton}
                >
                  <AddIcon />
                  <Typography>Add Memo</Typography>
                </Button>
                <Button
                  onClick={onClickBack}
                  variant="outlined"
                  className={classes.addButton}
                >
                  Back
                </Button>
              </div>
            </FormControl>
          </div>
        ) : (
          <div className={classes.navigationBtns}>
            <Button
              variant="outlined"
              className={classes.navigationBtn}
              onClick={onClickAddSection}
            >
              Add Section
            </Button>
            <Button
              variant="outlined"
              className={classes.navigationBtn}
              onClick={onClickAddSubSection}
            >
              Add SubSection
            </Button>
            <Button
              variant="outlined"
              className={classes.navigationBtn}
              onClick={onClickAddMemo}
            >
              Add Memo
            </Button>
            <Button
              variant="outlined"
              className={classes.navigationBtn}
              onClick={onClickBack}
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  sections: state.memos.sections,
  subSections: state.memos.subSections,
});
export default connect(mapStateToProps, {
  getSubSections,
  closeForm,
  addSection,
  addSubSection,
  addMemo,
})(AddForm);
