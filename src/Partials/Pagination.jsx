import React from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store/actions/userAction";
import PaginationButton from "../Components/PaginationButton";

// Pagination component for navigating between pages
const Pagination = ({ totalPages, currentPage }) => {
  const dispatch = useDispatch();

  // Handle page change and scroll to top
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchUsers(newPage));
      
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  // Don't render if only one page
  if (totalPages <= 1) return null;

  // Get array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const VISIBLE_PAGES = 5;

    if (totalPages <= VISIBLE_PAGES) {
      // Show all pages if less than visible limit
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show partial pages with ellipsis
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-5 items-center gap-2">
      <PaginationButton 
        type="prev" 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
      {getPageNumbers().map((page) => (
        <PaginationButton
          key={page}
          type="number"
          page={page}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ))}
      <PaginationButton 
        type="next" 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default Pagination;
