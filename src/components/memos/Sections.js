import React from "react";
import { Button } from "@material-ui/core";

import styles from "./styles";
import { connect } from "react-redux";
import {
  selectSection,
  getSubSections,
  deleteSection,
} from "../../actions/memoActions";

const Sections = (props) => {
  const form = { name: props.name, _id: props.id };
  const classes = styles();
  const onClick = () => {
    props.selectSection(form);
    props.getSubSections(props.id);
  };
  const onClickDelete = () => {
    props.deleteSection(props.id);
  };

  return (
    <div className={classes.item}>
      <div className={classes.itemName} onClick={onClick}>
        {props.name}
      </div>
      <Button onClick={onClickDelete} className={classes.deleteBtn}>
        Delete
      </Button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  sections: state.memos,
});
export default connect(mapStateToProps, {
  selectSection,
  deleteSection,
  getSubSections,
})(Sections);
