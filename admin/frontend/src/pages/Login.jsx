import React, { useState } from 'react';

const DUMMY_CREDENTIALS = { username: 'admin', password: 'admin123' };

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username === DUMMY_CREDENTIALS.username && password === DUMMY_CREDENTIALS.password) {
			setIsLoggedIn(true);
			setError('');
		} else {
			setError('Invalid credentials');
		}
	};

	if (isLoggedIn) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="bg-white p-8 rounded shadow text-center">
					<h2 className="text-2xl font-bold mb-4">Welcome, Admin!</h2>
					<p className="text-gray-700">You have successfully logged in.</p>
				</div>
			</div>
		);
	}

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
