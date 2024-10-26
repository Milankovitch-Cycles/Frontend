import React from "react";

const BaseButton = ({ onPress, children, className }) => {
  return (
    <button
      onClick={onPress}
      className={
        "bg-blue-600 mb-4 text-white w-full px-4 py-2 rounded-md hover:bg-blue-500"
      }
    >
      {children}
    </button>
  );
};

export default BaseButton;
