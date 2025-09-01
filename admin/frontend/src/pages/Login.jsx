import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DUMMY_CREDENTIALS = { username: 'admin', password: 'admin123' };

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		// If already logged in, redirect to /properties
		if (localStorage.getItem('isAdmin') === 'true') {
			navigate('/properties');
		}
	}, [navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username === DUMMY_CREDENTIALS.username && password === DUMMY_CREDENTIALS.password) {
			localStorage.setItem('isAdmin', 'true');
			setError('');
			navigate('/properties');
		} else {
			setError('Invalid credentials');
		}
	};

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
};

export default Login;
