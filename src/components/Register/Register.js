import React, { useState } from 'react';

import { useAuth } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { signUp } = useAuth();
	const navigate = useNavigate();
	const Swal = require('sweetalert2');

	const handleRegistro = async (e) => {
		e.preventDefault();

		await signUp(email, password)
			.then((userCredential) => {
				Swal.fire({
					title: 'Registro exitoso',
					confirmButtonText: 'Hecho',
					icon: 'success',
				});
				userCredential && navigate('/login');
			})
			.catch((error) => {
				setError(error);
			});
	};

	return (
		<div>
			<h2>Registro de usuario</h2>
			<form onSubmit={handleRegistro}>
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
				<button type='submit'>Registrar</button>
			</form>
			<p>{error && error.message}</p>
		</div>
	);
};

export default Register;
