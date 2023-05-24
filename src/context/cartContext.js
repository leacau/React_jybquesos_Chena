import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { auth } from '../services/firebase';

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

	const limpiarCarritoFunc = (mostrarMensaje) => {
		const Swal = require('sweetalert2');

		if (mostrarMensaje === 'yes') {
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
		} else {
			setCarrito([]);
		}
	};

	useEffect(() => {
		let cantProductos = 0;
		carrito.forEach((prod) => {
			cantProductos += prod.cantidad;
		});
		setCantProductos(cantProductos);
	}, [carrito]);

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const signUp = (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

	const signIn = (email, password) =>
		signInWithEmailAndPassword(auth, email, password);

	const logOut = () => signOut(auth);

	const resetPassword = (email) => sendPasswordResetEmail(auth, email);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
	}, []);

	return (
		<CartContext.Provider
			value={{
				carrito,
				addItem,
				quitarItem,
				cantProductos,
				limpiarCarrito,
				getTotal,
				limpiarCarritoFunc,
				signUp,
				signIn,
				user,
				logOut,
				loading,
				resetPassword,
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
