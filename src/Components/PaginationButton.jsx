import React from "react";

const PaginationButton = ({
  page,
  currentPage,
  totalPages,
  onPageChange,
  type = "number", // "prev", "next", "number"
}) => {
  const baseStyles =
    "flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg transition-all duration-200 cursor-pointer";

  const variantStyles = {
    number:
      currentPage === page
        ? "bg-sky-500 text-white font-semibold scale-105"
        : "bg-white text-gray-700 hover:bg-gray-200 hover:border-transparent",
    prev: "bg-gray-50 text-gray-600 hover:bg-gray-200 border-black/[.1] hover:border-transparent",
    next: "bg-gray-50 text-gray-600 hover:bg-gray-200 border-black/[.1] hover:border-transparent",
  };

  const disabledStyles =
    "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      className={`${baseStyles} ${variantStyles[type]} ${disabledStyles}`}
      onClick={() =>
        type === "prev"
          ? onPageChange(currentPage - 1)
          : type === "next"
          ? onPageChange(currentPage + 1)
          : onPageChange(page)
      }
      disabled={type === "prev" ? currentPage === 1 : type === "next" ? currentPage === totalPages : false}
    >
      {type === "prev" && <i className="ri-arrow-left-s-line text-xl"></i>}
      {type === "next" && <i className="ri-arrow-right-s-line text-xl"></i>}
      {type === "number" && page}
    </button>
  );
};

export default PaginationButton;
