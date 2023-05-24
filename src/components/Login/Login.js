import React, { useState } from 'react';

import { useAuth } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const Swal = require('sweetalert2');
	const { signIn, user } = useAuth();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		await signIn(email, password)
			.then((userCredential) => {
				Swal.fire({
					title: `Login exitoso ${user.email}`,
					confirmButtonText: 'Hecho',
					icon: 'success',
				});
				userCredential && navigate('/');
			})
			.catch((error) => {
				setError(error);
			});
	};

	return (
		<div>
			<h2>Iniciar sesión</h2>
			<form onSubmit={handleLogin}>
				<input
					type='email'
					placeholder='Correo electrónico'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Contraseña'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Iniciar sesión</button>
			</form>
			{error && <p>{error.message}</p>}
		</div>
	);
};

export default Login;
