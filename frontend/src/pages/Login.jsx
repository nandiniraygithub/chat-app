// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        // Basic validation
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        setLoading(true); // Set loading state

        try {
            const url = `http://localhost:8080/auth/login`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/chat'); // Redirect to chat section after successful login
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message || message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(`Login failed: ${err.message}`);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <span>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
