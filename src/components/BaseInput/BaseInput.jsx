import React from "react";

const BaseInput = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  className,
}) => {
  return (
    <div className="mb-4">
      <div className="border border-gray-300 rounded-md">
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md ${className}`}
          value={value}
          onChange={onChange}
        />
      </div>
      {error}
    </div>
  );
};

export default BaseInput;
