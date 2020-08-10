import React from "react";
import "./style.scss";
const Button: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
