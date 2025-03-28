import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../store/actions/userAction";
import Button from "../Components/Button";
import InputField from "../Components/InputField";

// Modal form component for editing user details
const PopUpEditAndCreate = () => {
  // Get user ID from URL params
  const userId = useParams().id;
  
  // Find user data from Redux store
  const user = useSelector((state) => 
    state.userreducer.users.find((user) => user.id === parseInt(userId))
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state with default values
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [job, setJob] = useState(user?.job || "");
  const [errors, setErrors] = useState("");

  // Validate required fields
  const validateForm = () => {
    const isValid = firstName.trim() && lastName.trim();
    setErrors(isValid ? "" : "First name and last name are required!");
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const updateData = {
        first_name: firstName,
        last_name: lastName,
        ...(job.trim() && { job: job.trim() })
      };

      await dispatch(updateUserAction(userId, updateData));
      navigate("/home");
    } catch (error) {
      console.error("Update failed:", error);
      setErrors("Failed to update user. Please try again.");
    }
  };

  // Close modal
  const handleClose = () => {
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50">
      <div className="bg-white shadow-xl rounded-lg px-10 py-8 w-full sm:max-w-md max-w-xs relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-rose-500 text-2xl"
          aria-label="Close modal"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Form title */}
        <h2 className="text-3xl font-bold capitalize text-gray-900 text-center mb-4">
          Edit
        </h2>

        {/* User edit form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            label="First Name"
            required
          />
          <InputField
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            label="Last Name"
            required
          />
          <InputField
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="Enter new job title (optional)"
            label="Job"
          />

          {/* Error message */}
          {errors && <p className="text-rose-500 text-sm text-center">{errors}</p>}
          
          <Button type="submit" variant="primary" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PopUpEditAndCreate;
