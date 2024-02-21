import React, { createContext, useContext, useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
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

export const useAuth = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useAuth debe estar dentro del proveedor de Auth');
	}
	return context;
};
export const CartProvider = ({ children }) => {
	const [carrito, setCarrito] = useState([]);
	const [cantProductos, setCantProductos] = useState(0);
	const [newMessage, setNewMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const [user, setUser] = useState('');
	const [loading, setLoading] = useState(true);
	const [infoUser, setInfoUser] = useState('');
	const [errorLogin, setErrorLogin] = useState('');

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

	const addProduct = (
		marca,
		producto,
		precio,
		descripcion,
		categoria,
		existencia
	) => {
		//agregar control de producto existente

		const [newItem, setNewItem] = useState([]);

		const handleAddProduct = async (e) => {
			e.preventDefault();

			const userCollection = collection(db, 'productos');
			if (
				marca === '' ||
				producto === '' ||
				precio === '' ||
				descripcion === '' ||
				categoria === '' ||
				existencia === ''
			) {
				setNewMessage('Por favor completá todos los campos');
				setMessageType('error');
			} else {
				setLoading(true);
				await addDoc(userCollection, newItem)
					.then(() => {
						setNewMessage('Contacto agregado con éxito');
						setMessageType('success');
						setNewItem({
							marca: '',
							producto: '',
							precio: '',
							descripcion: '',
							categoria: '',
							existencia: '',
						});
					})
					.catch((error) => {
						setNewMessage(error.code);
						setMessageType('error');
					});
				setLoading(false);
			}
		};

		handleAddProduct();
	};

	useEffect(() => {
		console.log('EJECUTADO EFFECT DE USUARIO');
		const checkUser = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		let cantProductos = 0;
		carrito.forEach((prod) => {
			cantProductos += prod.cantidad;
		});
		setCantProductos(cantProductos);
		checkUser();
	}, [carrito, user]);

	const signUp = (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

	const signIn = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password).catch((error) => {
			const errorCodeLogin = error.code;
			const errorMessageLogin = error.message;

			setErrorLogin({ code: errorCodeLogin, message: errorMessageLogin });
		});
		await onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
	};

	const logOut = () => {
		signOut(auth);
		setUser(false);
		setInfoUser('');
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
				newMessage,
				messageType,
				addProduct,
				logOut,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
