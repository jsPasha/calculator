import React from "react";

import classes from "./Info.css";

const info = () => {
  return (
    <div className={classes.Info}>
      <p>Enter - "="</p>
      <p>Esc - "C"</p>
      <p>Backspase - "←"</p>
    </div>
  );
};

export default info;
