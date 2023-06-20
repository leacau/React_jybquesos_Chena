import './ItemListContainer.css';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ItemList from '../ItemList/ItemList';
import { db } from '../../services/firebase';
import { useAuth } from '../../context/cartContext';
import { useParams } from 'react-router-dom';

const ItemListContainer = () => {
	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const Swal = require('sweetalert2');
	const { categoriaId } = useParams();

	useEffect(() => {
		setLoading(true);

		const collectionRef = categoriaId
			? query(
					collection(db, 'productos'),
					where('categoria', '==', categoriaId)
			  )
			: collection(db, 'productos');

		getDocs(collectionRef)
			.then((res) => {
				const productosFromatted = res.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				const productosFiltrados = productosFromatted.filter(
					(producto) => producto.existencia > 0
				);
				setProductos(productosFiltrados);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [categoriaId, user, Swal]);

	if (loading) {
		return <h1>cargando productos...</h1>;
	}
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
				<a href=''>
					<h2>Tienda de productos</h2>
				</a>
			</div>
			<div className='catalogo'>
				<ItemList productos={productos} />
			</div>
		</div>
	);
};

export default ItemListContainer;
