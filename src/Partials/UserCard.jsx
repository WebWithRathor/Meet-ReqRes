import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUserAction } from "../store/actions/userAction";
import Button from "../Components/Button";

// User card component displaying user info with edit/delete functionality
const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    // State for hover effects and delete confirmation popup
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Handle user deletion
    const handleDelete = () => {
        dispatch(deleteUserAction(user.id));
        setShowPopup(false);
    };

    return (
        <>
            {/* Main card container with hover animation */}
            <div
                className="bg-white flex-1 shadow-lg rounded-2xl p-6 text-center relative transition-all duration-300 ease-in-out transform hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* User avatar */}
                <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-300">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* User name and job tooltip */}
                <h2 className="text-lg font-semibold text-gray-800 mt-2 relative">
                    {user.first_name + " " + user.last_name}
                    {user.job && (
                        <div
                            className={`absolute top-[-1.7rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        >
                            Job : {user.job}
                        </div>
                    )}
                </h2>

                {/* User email */}
                <p className="text-gray-600 text-sm mt-1">{user.email}</p>

                {/* Action buttons */}
                <div className="btns flex gap-2 px-5 justify-center items-center mt-3">
                    <Button className="flex-1" to={`/home/edit/${user.id}`} variant="primary" size="sm">
                        Edit
                    </Button>
                    <Button className="flex-1" onClick={() => setShowPopup(true)} variant="danger" size="sm">
                        Delete
                    </Button>
                </div>
            </div>

            {/* Delete confirmation popup */}
            {showPopup && <PopupShow setShowPopup={setShowPopup} handleDelete={handleDelete} />}
        </>
    );
};

// Confirmation popup component for delete action
const PopupShow = ({ setShowPopup, handleDelete }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white p-6 rounded-md shadow-xl">
                <p className="text-lg text-gray-800 mb-4">Are you sure you want to delete this user?</p>
                <div className="flex justify-end gap-4">
                    <Button onClick={() => setShowPopup(false)} variant="ghost" size="md">Cancel</Button>
                    <Button onClick={handleDelete} variant="danger" size="md">Delete</Button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;