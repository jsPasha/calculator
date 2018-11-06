import React from "react";
import Button from "../../UI/Button/Button";

import classes from "./Control.css";

import Grid from "@material-ui/core/Grid";

const control = props => {
  let { elements, action } = props;

  return (
    <Grid container>
      {elements.map(el => (
        <Grid item xs={props.size} key={el} className={classes.Item}>
          <Button classes={props.type} click={() => action(el)}>
            {getSup(el)}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

const getSup = el => {
  if (el === "x2") {
    return (
      <React.Fragment>
        x<sup>2</sup>
      </React.Fragment>
    );
  }
  return el;
};

export default control;
