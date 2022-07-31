import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

export const RequireAuth = ({ children }) => {
    const location = useLocation();
    const useauth = useAuth();

    if (!useauth.isLogin()) {
        return <Navigate to='/login' state={{ path: location.pathname }}></Navigate>
    }

    return children
}