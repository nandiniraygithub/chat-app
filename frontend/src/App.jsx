import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Chat from './pages/Chat';
import ProtectedRoute from './components/protectRoute'; // Adjust path as necessary

function App() {
    return (
        <div className="App">
            <h1>Auth App</h1>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected routes go here */}
                <Route 
                    path="/home" 
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/chat" 
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </div>
    );
}

export default App;
