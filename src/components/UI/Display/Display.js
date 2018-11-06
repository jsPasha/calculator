import React from "react";

import ActionString from "./ActionString/ActionString";
import classes from "./Display.css";

const display = props => {
  let inputClassNames = [classes.DisplayInput];
  if (props.value.length > 20 && props.value.length < 24) inputClassNames.push(classes.Small);
  else if (props.value.length > 23) inputClassNames.push(classes.ExstraSmall);
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Display}>
        <ActionString string={props.actionString} />
        <input
          className={inputClassNames.join(" ")}
          type="text"
          readOnly
          value={props.value}
        />
      </div>
    </div>
  );
};

export default display;
