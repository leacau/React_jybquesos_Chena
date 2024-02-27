import './ItemDetailContainer.css';

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import ItemDetail from '../ItemDetail/ItemDetail';
import { db } from '../../services/firebase';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
	const [producto, setProducto] = useState();
	const [loading, setLoading] = useState(true);

	const { productoId } = useParams();

	useEffect(() => {
		const docRef = doc(db, 'productos', productoId);

		getDoc(docRef)
			.then((res) => {
				const productFormatted = { id: res.id, ...res.data() };
				setProducto(productFormatted);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [productoId]);

	if (loading) {
		return <h1>...cargando</h1>;
	}

	return (
		<>
			<h1 className='tituloDetalle'>Detalle del producto</h1>
			<ItemDetail {...producto} />
		</>
	);
};

export default ItemDetailContainer;
