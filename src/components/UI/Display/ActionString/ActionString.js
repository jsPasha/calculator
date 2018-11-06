import React from "react";

import classes from './ActionString.css'

const actionString = props => {
  return <div className={classes.String}>{props.string}</div>;
};

export default actionString;
