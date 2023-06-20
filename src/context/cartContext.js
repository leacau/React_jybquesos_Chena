import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	browserLocalPersistence,
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	setPersistence,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth } from '../services/firebase';
import { db } from '../services/firebase';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [carrito, setCarrito] = useState([]);
	const [cantProductos, setCantProductos] = useState(0);

	const addItem = (agregarProduct) => {
		const Swal = require('sweetalert2');

		if (
			!carrito.some((prod) => prod.id === agregarProduct.id) &&
			agregarProduct.cantidad > 0
		) {
			setCarrito([...carrito, agregarProduct]);
			Swal.fire({
				title: 'producto agregado',
				position: 'top',
				background: '#defde0',
				timer: 1000,
			});
		}
	};

	const quitarItem = (id) => {
		const Swal = require('sweetalert2');

		Swal.fire({
			title: '¡Estás por quitar un producto!',
			text: '¿Estás seguro?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, quitar producto!',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Producto quitado!',
					icon: 'success',
				});
				const nuevoCarrito = carrito.filter((prod) => prod.id !== id);
				setCarrito(nuevoCarrito);
			}
		});
	};

	const limpiarCarrito = () => {
		const Swal = require('sweetalert2');

		Swal.fire({
			title: 'Estás seguro?',
			text: 'No podrás revertir esto!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, limpiar carrito!',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					'Carrito limpio!',
					'Los productos fueron eliminados del carrito',
					'success'
				);
				setCarrito([]);
			}
		});
	};

	const getTotal = () => {
		let total = 0;
		let subtotal = 0;
		carrito.forEach((item) => {
			subtotal = item.cantidad * item.precio;
			total += subtotal;
		});
		return total;
	};

	useEffect(() => {
		let cantProductos = 0;
		carrito.forEach((prod) => {
			cantProductos += prod.cantidad;
		});
		setCantProductos(cantProductos);
	}, [carrito]);

	const [user, setUser] = useState('');
	const [loading, setLoading] = useState(true);
	const [infoUser, setInfoUser] = useState('');

	const signUp = (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

	const signIn = async (email, password) => {
		setPersistence(auth, browserSessionPersistence)
			.then(() => {
				return signInWithEmailAndPassword(auth, email, password);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
		await onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
	};
	const getUserData = async (userId) => {
		const docuRef = doc(db, `users/${userId}`);
		const infoCifrada = await getDoc(docuRef);
		const infoUsuario = infoCifrada.data();
		setInfoUser(infoUsuario);
	};

	const resetPassword = (email) => sendPasswordResetEmail(auth, email);

	return (
		<CartContext.Provider
			value={{
				carrito,
				addItem,
				quitarItem,
				cantProductos,
				limpiarCarrito,
				getTotal,
				signUp,
				signIn,
				user,
				loading,
				resetPassword,
				infoUser,
				getUserData,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useAuth debe estar dentro del proveedor de Auth');
	}
	return context;
};

export default CartContext;
