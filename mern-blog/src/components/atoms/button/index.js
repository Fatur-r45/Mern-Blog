import React from "react";
import "./button.scss";

const Button = ({ title, Loading, ...rest }) => {
  if (Loading) {
    return <button className="button">loading...</button>;
  }
  return (
    <button className="button" {...rest}>
      {title}
    </button>
  );
};

export default Button;
