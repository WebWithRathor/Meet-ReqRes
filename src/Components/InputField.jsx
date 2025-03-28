import React from "react";

const InputField = ({
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  icon, // Accepts an optional icon for search or other purposes
  className = "",
}) => {
  return (
    <div className="relative w-full flex-grow min-w-0">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 ${icon ? "pl-10" : "pl-3"} pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-all duration-200 shadow-sm ${className}`}
        />
      </div>
    </div>
  );
};

export default InputField;
