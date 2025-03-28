import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  to,
  type = "button",
  variant = "primary", // primary, secondary, danger, ghost
  size = "md", // sm, md, lg
  fullWidth = false,
  icon, // Icon class (e.g., "ri-login-box-line")
  className = "",
}) => {
  const baseStyles = "px-4 cursor-pointer py-2 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 justify-center";
  const sizeStyles = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  const variantStyles = {
    primary: "bg-sky-600/[.9] opacity-75 text-white hover:bg-sky-700 focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "opacity-75 bg-rose-700/[.9] text-white hover:bg-rose-900",
    ghost: "bg-gray-300 text-gray-600 hover:bg-gray-200",
  };

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children} {icon && <i className={icon}></i>}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children} {icon && <i className={icon}></i>}
    </button>
  );
};

export default Button;
