import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/reqres";
import { useDispatch } from "react-redux";
import { login, signup } from "../store/actions/userAction";
import Button from "../Components/Button";
import InputField from "../Components/InputField";

// Component for handling both login and signup functionality
const AuthPortal = ({ title, isLoginPage }) => {
    // Form state management
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };
        // Dispatch appropriate action based on page type
        dispatch(!isLoginPage ? signup(userData, navigate) : login(userData, navigate));
    };

    return (
        <div className="min-h-screen poppins-regular flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white shadow-xl rounded-lg px-10 py-8 w-full sm:max-w-md max-w-xs">
                {/* Auth form title */}
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    {title}
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email input */}
                    <InputField
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        label="Email Address"
                    />

                    {/* Password input */}
                    <InputField
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        label="Password"
                    />

                    {/* Submit Button */}
                    <Button type="submit" variant="primary" fullWidth>
                        {isLoginPage ? "Login" : "Sign up"}
                    </Button>
                </form>

                {/* Toggle between login and signup */}
                <p className="text-sm text-gray-500 text-center mt-5">
                    {isLoginPage ? "Don't have an account?" : "Already have an account?"}{" "}
                    <Link to={isLoginPage ? "/signup" : "/"} className="text-sky-600 font-medium hover:underline">
                        {isLoginPage ? "Sign up here" : "Login"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthPortal;
