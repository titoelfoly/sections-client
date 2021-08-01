import React from "react";
import { Typography, Button } from "@material-ui/core";
import styles from "./styles";

const MemoContent = (props) => {
  const classes = styles();
  console.log("called");
  return (
    <div className={classes.item}>
      <Typography className={classes.itemName}>{props.content}</Typography>
    </div>
  );
};
export default MemoContent;
