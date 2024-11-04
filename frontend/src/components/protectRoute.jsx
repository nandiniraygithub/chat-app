/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token'); // Get token from local storage
    const username = localStorage.getItem('username') || "User"; // Get username with a fallback

    // Check if token exists, otherwise redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Welcome, {username}!</p>
            {children}
        </div>
    );
}

export default ProtectedRoute;
