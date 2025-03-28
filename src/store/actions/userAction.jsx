import { deleteUser, getUser, getUsers, loginUser, registerUser, updateUser } from "../../services/reqres";
import { setPage, setTotalPages, setUsers, setUser } from "../reducers/userSlice";
import { toast } from "react-toastify";

const handleAsync = (asyncFn, successMessage) => async (dispatch, getState) => {
    try {
        const result = await asyncFn(dispatch, getState);
        if (result && successMessage) toast.success(successMessage);
        return result;
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        return null;
    }
};

export const fetchUsers = (page) => handleAsync(async (dispatch) => {
    const { data, total_pages, page: currentPage } = await getUsers(page);
    dispatch(setUsers(data));
    dispatch(setTotalPages(total_pages));
    dispatch(setPage(currentPage));
    return data;
});

export const login = (userData, navigate) => handleAsync(async (dispatch) => {
    const data = await loginUser(userData);
    if (!data?.token) {
        toast.error("Login failed: No token received");
        return null;
    }

    sessionStorage.setItem("token", data.token);
    dispatch(setUser({ email: userData.email }));
    navigate("/home");
    return data;
}, "Login successful");

export const signup = (userData, navigate) => handleAsync(async (dispatch) => {
    const data = await registerUser(userData);
    if (!data?.token) {
        toast.error("Signup failed: No token received");
        return null;
    }

    sessionStorage.setItem("token", data.token);
    dispatch(setUser({ email: userData.email }));
    navigate("/home");
    return data;
}, "Signup successful");

export const updateUserAction = (userId, userData) => handleAsync(async (dispatch, getState) => {
    const { users } = getState().userreducer;
    const existingUser = users.find(user => user.id == userId);
    if (!existingUser) {
        toast.error("User not found!");
        return null;
    }

    let updatedFields = { ...userData };
    if (userData.name) {
        const [first_name, ...lastNameParts] = userData.name.trim().split(" ");
        updatedFields.first_name = first_name;
        updatedFields.last_name = lastNameParts.join(" ") || existingUser.last_name;
        delete updatedFields.name;
    }

    const updatedUser = await updateUser(userId, { ...existingUser, ...updatedFields });
    if (!updatedUser) {
        toast.error("User update failed");
        return null;
    }

    dispatch(setUsers(users.map(user => user.id == userId ? updatedUser : user)));
    dispatch(setUser(updatedUser));
    return updatedUser;
}, "User updated successfully");

export const deleteUserAction = (userId) => handleAsync(async (dispatch, getState) => {
    await deleteUser(userId);
    const { users } = getState().userreducer;
    dispatch(setUsers(users.filter(user => user.id !== userId)));
    return true;
}, "User deleted successfully");

export const fetchUserById = (userId) => handleAsync(async (dispatch) => {
    const user = await getUser(userId);
    if (!user) {
        toast.error("User fetch failed");
        return null;
    }
    dispatch(setUser(user));
    return user;
}, "User fetched successfully");
