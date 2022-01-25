import React from "react";
import "./Button.scss";

const Button = (props) => {
  const { confirm, cancel, claimed } = props
  let buttonClass = "button";

  if (confirm) {
    buttonClass += " button--confirm";
  }
  if (cancel) {
    buttonClass += " button--cancel";
  }
  if (claimed) {
    buttonClass += " button--claimed";
  }

  return <button onClick={props.onClick} className={buttonClass}>{props.children}</button>;
}

export default Button;