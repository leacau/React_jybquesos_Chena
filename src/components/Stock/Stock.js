import './Stock.css';

import React, { useEffect, useState } from 'react';
import { collection, docs, getDocs, query, where } from 'firebase/firestore';

import { db } from '../../services/firebase';

const StockProductos = () => {
	const [productos, setProductos] = useState([]);

	useEffect(() => {
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
						{/* Agregar aquí la visualización de la imagen del producto */}
					</li>
				))}
			</ul>
		</div>
	);
};

export default StockProductos;
