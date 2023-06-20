import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../services/firebase';
import { useAuth } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [apellido, setApellido] = useState('');
	const [nombre, setNombre] = useState('');
	const [telefono, setTelefono] = useState('');
	const [error, setError] = useState('');
	const [userName, setUserName] = useState('');
	const { signUp } = useAuth();
	const navigate = useNavigate();
	const Swal = require('sweetalert2');

	const handleRegistro = async (e) => {
		e.preventDefault();
		if (
			email === '' ||
			password === '' ||
			userName === '' ||
			telefono === '' ||
			nombre === '' ||
			apellido === ''
		) {
			setError('Todos los campos son obligatorios');
		} else {
			await signUp(email, password, userName, telefono, nombre, apellido)
				.then((userCredential) => {
					Swal.fire({
						title: 'Registro exitoso',
						confirmButtonText: 'Hecho',
						icon: 'success',
					});
					const docuRef = doc(db, `users/${userCredential.user.uid}`);
					setDoc(docuRef, {
						userName: userName,
						telefono: telefono,
						nombre: nombre,
						apellido: apellido,
						rol: '',
					});
					userCredential && navigate('/login');
				})
				.catch((error) => {
					console.log(error.code);
					switch (error.code) {
						case 'auth/weak-password' || 'auth/invalid-password':
							setError(
								'La contraseña es insegura. Debe ser mayor a 6 caracteres.'
							);
							break;
						case 'auth/internal-error':
							setError(`Error interno del servidor. Intentá más tarde`);
							break;
						case 'auth/invalid-email' || 'auth/invalid-email-verified':
							setError('El email no es válido.');
							break;
						case 'auth/email-already-in-use' || 'auth/email-already-exists':
							setError('El e-mail ingresado ya está registrado');
							break;
						default:
							setError('Error de registro. Contactanos para poder ayudarte.');
							break;
					}
				});
		}
	};

	return (
		<div>
			<h2>Registro de usuario</h2>
			<form onSubmit={handleRegistro}>
				<input
					type='text'
					placeholder='Nombre de Usuario'
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Apellido'
					value={apellido}
					onChange={(e) => setApellido(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Nombre'
					value={nombre}
					onChange={(e) => setNombre(e.target.value)}
				/>
				<input
					type='phone'
					placeholder='Teléfono'
					value={telefono}
					onChange={(e) => setTelefono(e.target.value)}
				/>
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
			<p>{error && error}</p>
		</div>
	);
};

export default Register;
