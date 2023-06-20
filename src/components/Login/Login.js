import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Register from '../Register/Register';
import { useAuth } from '../../context/cartContext';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { signIn, user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signIn(email, password);
		} catch (error) {
			console.log('Error: ', error);
			setError(error.message);
		}
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
			<br />
			Si todavía no tenes cuenta
			<span>
				<Link to='/register' className='navLink'>
					registrate
				</Link>
			</span>
			<Register />
		</div>
	);
};

export default Login;
