import React from "react";
import { Button, Typography } from "@material-ui/core";

import styles from "./styles";
import { connect } from "react-redux";
import { getMemo, deleteMemo } from "../../actions/memoActions";

const Memos = (props) => {
  const classes = styles();
  const onClick = () => {
    props.getMemo(props.id);
    console.log(props.sections, "getMemo");
  };
  const onClickDelete = () => {
    props.deleteMemo(props.id);
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
export default connect(mapStateToProps, { getMemo, deleteMemo })(Memos);
