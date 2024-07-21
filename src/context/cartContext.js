import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { auth } from '../services/firebase';
import { db } from '../services/firebase';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [carrito, SetCarrito] = useState([]);
	const [cantProductos, SetCantProductos] = useState(0);
	const [user, SetUser] = useState('');
	const [loading, SetLoading] = useState(true);
	const [infoUser, SetInfoUser] = useState('');
	const [errorLogin, SetErrorLogin] = useState('');
	const [productos, SetProductos] = useState([]);
	const [adminProductos, SetAdminProductos] = useState([]);
	const Swal = require('sweetalert2');

	useEffect(() => {
		if (productos.length === 0) {
			obtenerProductos();
		}

		let cantProductos = 0;
		carrito.forEach((prod) => {
			cantProductos += prod.cantidad;
		});
		SetCantProductos(cantProductos);
		onAuthStateChanged(auth, (currentUser) => {
			SetUser(currentUser);
			SetLoading(false);
		});
	}, [carrito, user, productos]);

	const setLocalStorage = (array, item) => {
		console.log(item);
		const newLocalStorage = [...array, item];
		localStorage.setItem('carritoStorage', JSON.stringify(newLocalStorage));
	};

	const addItem = (agregarProduct) => {
		if (!carrito.some((prod) => prod.id === agregarProduct.id)) {
			SetCarrito([...carrito, agregarProduct]);
			Swal.fire({
				title: 'producto agregado',
				position: 'top',
				background: '#defde0',
				timer: 1000,
			});
			setLocalStorage(carrito, agregarProduct);
		} else {
			const nuevoCarrito = carrito.filter(
				(prod) => prod.id !== agregarProduct.id
			);
			SetCarrito([...nuevoCarrito, agregarProduct]);

			Swal.fire({
				title: 'producto modificado',
				position: 'top',
				background: '#defde0',
				timer: 1000,
			});
			setLocalStorage(carrito);
		}
	};

	const obtenerProductos = async () => {
		SetLoading(true);

		const collectionRef = collection(db, 'productos');

		await getDocs(collectionRef)
			.then((res) => {
				const productosFromatted = res.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				const productosFiltrados = productosFromatted.filter(
					(producto) => producto.existencia > 0
				);
				SetAdminProductos(productosFromatted);
				SetProductos(productosFiltrados);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				SetLoading(false);
			});
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
					background: '#f1ff2b',
					timer: 1000,
					position: 'bottom-end',
				});
				const nuevoCarrito = carrito.filter((prod) => prod.id !== id);
				SetCarrito(nuevoCarrito);
			}
			setLocalStorage(carrito);
		});
	};

	const limpiarCarrito = (params) => {
		const Swal = require('sweetalert2');

		/* 	if (params === undefined || params === null || params === '') {
		} */

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
				SetCarrito([]);
				localStorage.clear();
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

	const loadLocalStorage = async () => {
		const storageCart = await localStorage.getItem('carritoStorage');
		if (storageCart !== null && storageCart.length > 0) {
			const dataStorageCart = await JSON.parse(storageCart);
			SetCarrito(dataStorageCart);
		}
	};

	const signUp = (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

	const signIn = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password).catch((error) => {
			const errorCodeLogin = error.code;
			const errorMessageLogin = error.message;

			SetErrorLogin({ code: errorCodeLogin, message: errorMessageLogin });
		});
		await onAuthStateChanged(auth, (currentUser) => {
			SetUser(currentUser);
			SetLoading(false);
		});
	};

	const logOut = async () => {
		await signOut(auth);
		SetUser('');
		SetInfoUser('');
	};

	const getUserData = async (userId) => {
		const docuRef = doc(db, `users/${userId}`);
		const infoCifrada = await getDoc(docuRef);
		const infoUsuario = infoCifrada.data();
		SetInfoUser(infoUsuario);
	};
	const resetPassword = (email) => sendPasswordResetEmail(auth, email);

	return (
		<CartContext.Provider
			value={{
				errorLogin,
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
				logOut,
				productos,
				obtenerProductos,
				adminProductos,
				setLocalStorage,
				loadLocalStorage,
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
