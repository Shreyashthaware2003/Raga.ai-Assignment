import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export default function ProtectedRoute() {
    const user = localStorage.getItem("healthcare_user");

    if (!user) return <Navigate to="/login" />;

    return (
        <>
            <Outlet />
        </>
    )
}
