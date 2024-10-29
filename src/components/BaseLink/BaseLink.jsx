import React from "react";
import { Link } from "react-router-dom";

const BaseLink = ({ path, text, className }) => {
  return (
    <Link to={path}>
      <button className={`text-sm ${className}`}>{text}</button>
    </Link>
  );
};

export default BaseLink;
