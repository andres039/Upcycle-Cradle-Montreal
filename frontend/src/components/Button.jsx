import React from "react";
import "./Button.scss";

const Button = (props) => {
  let buttonClass = "button";

  if (props.confirm) {
    buttonClass += " button--confirm";
  }
  if (props.cancel) {
    buttonClass += " button--cancel";
  }
  if (props.claimed) {
    buttonClass += " button--claimed";
  }

  return <button onClick={props.onClick} className={buttonClass}>{props.children}</button>;
}

export default Button;