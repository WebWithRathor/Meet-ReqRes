import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const token = sessionStorage.getItem("token");
    return token ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
