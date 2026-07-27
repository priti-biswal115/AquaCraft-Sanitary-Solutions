import React from "react";
import { Navigate } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";

const ProtectedRoute = ({ children }) => {
    const { selectedCustomerId } = useCustomer();

    if (!selectedCustomerId) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
