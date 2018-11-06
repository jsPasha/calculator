import React, { Component } from "react";

import Info from "../../components/Info/Info";
import Display from "../../components/UI/Display/Display";
import ControlPanel from "../../components/ControlPanel/ControlPanel";

import Decimal from "decimal.js";

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, "+/-", 0, "."];
const mathActions = {
  simple: ["÷", "×", "-", "+", "="],
  hard: ["%", "√", "x2", "1/x"]
};
const displayActions = ["ce", "c", "←"];

const defaultState = {
  display: "0",
  value: null,
  prevAction: null,
  actionHandled: false,
  prevActionValue: null,
  actionString: null,
  hardAction: false
};

class Calculator extends Component {
  state = { ...defaultState, showInfo: false };

  componentDidMount() {
    document.addEventListener("keydown", e => {
      let { key } = e;
      if (key.length > 1 && key[0] === "F") return;

      e.preventDefault();

      this.setState({ showInfo: true });

      if (numbers.includes(key) || numbers.includes(+key))
        return this.handleConcat(key);

      if (mathActions.simple.includes(key)) return this.handleAction(key);
      if (key === "Backspace") return this.handleDisplayAction("←");
      if (key === "Escape") return this.handleDisplayAction("c");
      if (key === "Enter") return this.handleAction("=");
      if (key === "/") return this.handleAction("÷");
      if (key === "*") return this.handleAction("×");
    });
  }

  handleConcat = value => {
    let nextState = { ...this.state };
    let { display, actionHandled } = this.state;

    if (
      (value === "." && String(display).indexOf(".") !== -1) ||
      display.length > 20
    )
      return;

    if (value === "+/-") {
      nextState.display = -display;
      nextState.value = -display;
      nextState.actionHandled = false;
      return this.setState(nextState);
    }

    if (String(display) === "0") {
      if (value === 0) return;
    }

    if (String(display) === "0" || actionHandled) {
      if (value === ".") value = "0.";
      nextState.display = value;
      nextState.actionHandled = false;
    } else {
      nextState.display = display + `${value}`;
    }

    this.setState(nextState);
  };

  handleAction = action => {
    let nextState = { ...this.state };

    let actionValue;

    let {
      value,
      display,
      prevAction,
      actionHandled,
      prevActionValue,
      actionString,
      hardAction
    } = this.state;

    if (!prevActionValue && action === "=") {
      prevActionValue = display;
      nextState.prevActionValue = display;
    }

    if (action !== "=") {
      if (!actionHandled || prevActionValue) {
        nextState.actionString =
          actionString && !hardAction
            ? `${actionString} ${display} ${action}`
            : !hardAction
              ? `${display} ${action}`
              : `${actionString} ${action}`;
      } else {
        nextState.actionString = actionString.slice(0, -1) + action;
      }
      prevActionValue = null;
      nextState.prevActionValue = null;
    } else {
      nextState.actionString = null;
    }

    nextState.hardAction = false;

    actionValue = !prevActionValue ? display : prevActionValue;

    if (!actionHandled || action === "=") {
      switch (prevAction) {
        case "+":
          if (value !== null)
            display = new Decimal(value).plus(actionValue).toString();
          break;

        case "-":
          if (value !== null) {
            display = new Decimal(value).minus(actionValue).toString();
          }
          break;

        case "×":
          if (value !== null) {
            display = new Decimal(value).mul(actionValue).toString();
          }
          break;

        case "÷":
          if (value !== null) {
            display = new Decimal(value).div(actionValue).toString();
          }
          break;

        default:
          break;
      }

      nextState.value = display;
      nextState.display = display;
    }

    nextState.actionHandled = true;

    if (action !== "=") nextState.prevAction = action;

    this.setState(nextState);
  };

  handleHardAction = action => {
    let { value: v, display: d, actionString: astr, hardAction: ha } = this.state;
    switch (action) {
      case "√":
        astr = makeString(d, astr, ha, "√");
        d = Decimal.sqrt(d).toString();
        break;
      case "x2":
        astr = makeString(d, astr, ha, "sqr");
        d = new Decimal(d).mul(d).toString();
        break;
      case "1/x":
        astr = makeString(d, astr, ha, "1/");
        d = new Decimal(1).div(d).toString();
        break;
      case "%":
        if (v) {
          d = new Decimal(v).mul(d).div(100).toString();
        } else {
          d = 0;
        }
        astr = null;
        break;

      default:
        return;
    }

    this.setState({ display: d, actionString: astr, hardAction: true });
  };

  handleDisplayAction = action => {
    switch (action) {
      case "c":
        this.clearState();
        break;

      case "←":
        this.back();
        break;

      case "ce":
        this.clearDisplay();
        break;

      default:
        break;
    }
  };

  clearState = () => {
    this.setState(defaultState);
  };

  clearDisplay = () => {
    this.setState({ display: "0" });
  };

  back = () => {
    this.setState(prevState => ({
      ...prevState,
      display:
        String(prevState.display).length === 1
          ? "0"
          : String(prevState.display).slice(0, -1)
    }));
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showInfo ? <Info /> : null}
        <Display
          actionString={this.state.actionString}
          value={this.state.display}
        />
        <ControlPanel
          elements={{ displayActions, numbers, mathActions }}
          actions={{
            handleDisplayAction: this.handleDisplayAction,
            handleConcat: this.handleConcat,
            handleAction: this.handleAction,
            handleHardAction: this.handleHardAction
          }}
        />
      </React.Fragment>
    );
  }
}

const makeString = (d, astr, ha, a) => {
  let arr;
  if (ha) {
    arr = astr.split(" ");
    arr[arr.length - 1] = `${a}(${arr[arr.length - 1]})`;
  }
  return !astr ? `${a}(${d})` : !ha ? `${astr} ${a}(${d})` : arr.join(" ");
};

export default Calculator;
