import React from "react";
//If there is time to refactor: import classNames from "classnames";

 const Button = (props) => {
  let buttonClass = props.class;
  
  if (props.save) {
    buttonClass += " button--save";
  }
  if (props.cancel) {
    buttonClass += " button--cancel";
  }
  if (props.login) {
    buttonClass += " button--login";
  }
  
  return <button onClick={props.onClick} className={buttonClass}>{props.children}</button>;
}

export default Button