import './Stock.css';

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../services/firebase';
import { useAuth } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const StockProductos = () => {
	const { infoUser } = useAuth();
	const [productos, setProductos] = useState([]);
	const navigate = useNavigate();
	const Swal = require('sweetalert2');

	useEffect(() => {
		if (infoUser.rol !== 'admin') {
			Swal.fire({
				position: 'top-end',
				icon: 'info',
				title: 'Tus permisos no son suficiente para ingresar a esta sección',
				showConfirmButton: false,
				timer: 2000,
			}).then(() => {
				navigate('/');
			});
		} else {
			const obtenerProductos = async () => {
				try {
					const productosRef = collection(db, 'productos');
					const productosSnapshot = await getDocs(productosRef);
					const productosData = productosSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					setProductos(productosData);
				} catch (error) {
					console.error(error);
					// Manejo de errores
				}
			};

			obtenerProductos();
		}
	}, []);

	return (
		<div>
			<h1 className='title'>Stock de productos</h1>
			<ul>
				{productos.map((producto) => (
					<li className='lista' key={producto.id}>
						<h3>{producto.marca}</h3>
						<h4>{producto.tipo}</h4>
						<p>Cantidad: {producto.existencia}</p>
						<p>Precio: {producto.precio}</p>
						<img
							className='imagenProd'
							src={producto.img}
							alt={`foto de una imagen de un queso ${producto.tipo}`}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default StockProductos;
