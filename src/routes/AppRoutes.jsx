import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPortal from "../Pages/AuthPortal";
import HomePage from "../Pages/HomePage";
import PopUpEditAndCreate from "../Partials/PopUpEditAndCreate";
import ProtectedRoute from "../Partials/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPortal title={"Welcome back"} isLoginPage={true} />} />
      <Route path="/signup" element={<AuthPortal title={"Create your account"} isLoginPage={false} />} />
      <Route path="/home" element={<ProtectedRoute element={<HomePage />} />}>
        <Route path="/home/edit/:id" element={<ProtectedRoute element={<PopUpEditAndCreate />} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
