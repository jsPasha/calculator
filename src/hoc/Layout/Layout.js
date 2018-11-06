import React from "react";

import classes from "./Layout.css";

const layout = props => {
  return (
    <div className={classes.Layout}>
      <div className={classes.Body}>{props.children}</div>
    </div>
  );
};

export default layout;
