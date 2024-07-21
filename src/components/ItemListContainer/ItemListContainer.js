import './ItemListContainer.css';

import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ItemList from '../ItemList/ItemList';
import { useAuth } from '../../context/cartContext';
import { useParams } from 'react-router-dom';

const ItemListContainer = () => {
	const { user, productos, loading, loadLocalStorage, carrito } = useAuth();
	const { categoriaId } = useParams();
	const [productosMostrados, setProductosMostrados] = useState();

	useEffect(() => {
		if (categoriaId === undefined) {
			setProductosMostrados(productos);
		} else {
			setProductosMostrados(
				productos.filter((producto) => producto.categoria === categoriaId)
			);
		}
		if (carrito.length === 0) {
			loadLocalStorage();
		}
	}, [categoriaId, productos]);

	if (productos !== undefined) {
		if (loading) {
			return <h1>cargando productos...</h1>;
		} else {
			return (
				<div>
					{!user && (
						<Alert className='alert' severity='warning'>
							<AlertTitle>Atención</AlertTitle>
							Para agregar productos al carrito —{' '}
							<strong>ingresá a tu cuenta.</strong>
						</Alert>
					)}
					<div className='saludo'>
						<h2>Tienda de productos</h2>
					</div>
					{productos !== undefined && (
						<div className='catalogo'>
							<ItemList productos={productosMostrados} />
						</div>
					)}
				</div>
			);
		}
	}
};

export default ItemListContainer;
