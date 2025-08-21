import React, { useState, useEffect } from 'react';

import Navbar from './components/common/Navbar';
import ToastContainer from './components/common/ToastContainer';
import { ContactUsProvider } from './context/ContactUsContext';
import ContactUsList from './pages/ContactUsList';
import Properties from './pages/Properties';
import Blog from './pages/Blog';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

const DUMMY_CREDENTIALS = { username: 'admin', password: 'admin123' };

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === DUMMY_CREDENTIALS.username && password === DUMMY_CREDENTIALS.password) {
      setIsLoggedIn(true);
      localStorage.setItem('isAdmin', 'true');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };
  // Optional: Listen for storage changes in other tabs and log out if needed
  useEffect(() => {
    const handleStorage = () => {
      if (localStorage.getItem('isAdmin') !== 'true') {
        setIsLoggedIn(false);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
          <h2 className="text-xl font-bold mb-6">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded">Login</button>
          <div className="mt-3 text-xs text-gray-500">Demo: admin / admin123</div>
        </form>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-1 min-h-screen bg-gray-50">
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            <Route path="/properties" element={<Properties />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/contactus"
              element={
                <ContactUsProvider>
                  <ContactUsList />
                </ContactUsProvider>
              }
            />
            <Route path="*" element={<Navigate to="/properties" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
