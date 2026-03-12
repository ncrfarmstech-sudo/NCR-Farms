import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('isAdmin') === 'true') {
			navigate('/properties');
		}
	}, [navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
			localStorage.setItem('isAdmin', 'true');
			setError('');
			navigate('/properties');
		} else {
			setError('Invalid email or password');
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
				<h2 className="text-xl font-bold mb-6">Admin Login</h2>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
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
			</form>
		</div>
	);
};

export default Login;
