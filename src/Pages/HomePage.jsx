// Import necessary dependencies
import React, { useEffect, useState, useMemo } from "react";
import UserCard from "../Partials/UserCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/actions/userAction.jsx";
import Pagination from "../Partials/Pagination.jsx";
import { Outlet } from "react-router-dom";
import Navbar from "../Partials/Navbar.jsx";

// Home component for displaying user cards with search and pagination
const Home = () => {
  const dispatch = useDispatch();
  // Get user data from Redux store
  const { users, currentPage, totalPages } = useSelector((state) => state.userreducer);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers()).then(() => setLoading(false));
  }, [dispatch]);

  // Debounce search input to prevent excessive filtering
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [users, debouncedSearch]);

  return (
    <>
      <Outlet />
      <div className="min-h-screen bg-gray-50 flex flex-col w-full">
        {/* Navigation bar with search functionality */}
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Loading spinner, user cards grid, or no results message */}
        {loading ? (
          <div className="flex items-center justify-center mt-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-500"></div>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid lg:px-20 xl:px-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-10">No users found.</p>
        )}

        {/* Pagination controls */}
        <div className="w-full flex justify-center mt-auto mb-5">
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </div>
    </>
  );
};

export default Home;
