import React from "react";
import Control from "./Control/Control";
import Grid from "@material-ui/core/Grid";

import classes from "./ControlPanel.css";

const controlPanel = props => (
  <Grid container className={classes.ControlPanel}>
    <Grid item xs={12}>
      <Control
        type="ActionTwo"
        elements={props.elements.mathActions.hard}
        size={3}
        action={props.actions.handleHardAction}
      />
    </Grid>
    <Grid item xs={9}>
      <Control
        type="Display"
        size={4}
        elements={props.elements.displayActions}
        action={props.actions.handleDisplayAction}
      />
      <Control
        type="Number"
        size={4}
        elements={props.elements.numbers}
        action={props.actions.handleConcat}
      />
    </Grid>
    <Grid item xs={3}>
      <Control
        type="Action"
        elements={props.elements.mathActions.simple}
        size={12}
        action={props.actions.handleAction}
      />
    </Grid>
  </Grid>
);

export default controlPanel;
