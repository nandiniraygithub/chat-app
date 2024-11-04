// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(user); // Set the user for display purposes
        } else {
            navigate('/login'); // Redirect if no user is logged in
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', color: '#333' }}>Welcome, {loggedInUser}!</h1>
            <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
            <ToastContainer />
        </div>
    );
}

export default Home;
