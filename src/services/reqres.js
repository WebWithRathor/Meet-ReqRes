import { toast } from "react-toastify";
import Axios from "../utils/Axios";

// Generic handler for API requests that handles errors and returns data
const handleRequest = async (method, url, body = null) => {
    try {
        const { data } = await Axios[method](url, body);
        return data;
    } catch (error) {
        toast.error(error.response?.data?.error || "Something went wrong!");
    }
};

// Get paginated list of users
export const getUsers = (pageNo = 1) => handleRequest("get", `/users?page=${pageNo}&per_page=8`);

// Get single user by ID
export const getUser = (id) => handleRequest("get", `/users/${id}`);

// Register new user
export const registerUser = (user) => handleRequest("post", "/register", user);

// Login existing user
export const loginUser = (user) => handleRequest("post", "/login", user);

// Update user data
export const updateUser = (userId, userData) => handleRequest("put", `/users/${userId}`, userData);

// Delete user by ID
export const deleteUser = (userId) => handleRequest("delete", `/users/${userId}`);
