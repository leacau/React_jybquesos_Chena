import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ItemAdd from '../ItemAdd/ItemAdd';
import Swal from 'sweetalert2';
import { db } from '../../services/firebase';
import { useAuth } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const StockProductos = () => {
	const { infoUser, user } = useAuth();
	const [productos, setProductos] = useState([]);
	const [mostrar, setMostrar] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		console.log('UseEffect de la funcion');
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
				}
			};
			obtenerProductos();
		}
	}, [infoUser, user]);

	const handleRowClick = (params) => {
		navigate(`/editar/${params.id}`);
	};

	const columns = [
		{ field: 'categoria', headerName: 'categoria', editable: true },
		{ field: 'descripcion', headerName: 'descripción', editable: true },
		{ field: 'existencia', headerName: 'existencia', editable: true },
		{ field: 'id', headerName: 'id', editable: true },
		{ field: 'marca', headerName: 'marca', editable: true },
		{ field: 'precio', headerName: 'precio', editable: true },
		{ field: 'producto', headerName: 'producto', editable: true },
	];

	console.log('Cuerto de la funcion');

	return (
		<div style={{ height: 700, width: '100%' }}>
			<DataGrid
				rows={productos}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},
				}}
				pageSizeOptions={[10]}
				onRowClick={handleRowClick}
			/>
			<AddCircleIcon
				color='primary'
				className='large'
				onClick={() => {
					setMostrar(!mostrar);
				}}
			/>
			{mostrar ? <ItemAdd /> : ''}
		</div>
	);
};

export default StockProductos;
