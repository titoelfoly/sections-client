import React from "react";
import { Button, Typography } from "@material-ui/core";

import styles from "./styles";
import { connect } from "react-redux";
import {
  selectSubSection,
  getMemos,
  deleteSubSection,
} from "../../actions/memoActions";

const SubSections = (props) => {
  const form = { name: props.name, _id: props.id };
  const classes = styles();
  const onClick = () => {
    props.selectSubSection(form);
    props.getMemos(props.id);
  };
  const onClickDelete = () => {
    props.deleteSubSection(props.id);
  };

  return (
    <div className={classes.item}>
      <Typography className={classes.itemName} onClick={onClick}>
        {props.name}
      </Typography>
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
  getMemos,
  selectSubSection,
  deleteSubSection,
})(SubSections);
