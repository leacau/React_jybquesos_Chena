import './Stock.css';

import { AddCircleOutlined, CachedOutlined } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { deepOrange, teal } from '@mui/material/colors';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Importer from '../Importer/Importer';
import { useAuth } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const StockProductos = () => {
	const { user, infoUser, adminProductos, obtenerProductos, loading } =
		useAuth();
	const navigate = useNavigate();
	const Swal = require('sweetalert2');
	const addColor = teal[50];
	const refreshColor = deepOrange[900];

	const nuevo_prod = {
		id: 'nuevo_prod',
		marca: '',
		producto: '',
		precio: '',
		existencia: '',
		categoria: '',
		descripcion: '',
	};

	useEffect(() => {
		if (infoUser.rol !== 'admin' || user === '') {
			Swal.fire({
				position: 'top-end',
				icon: 'info',
				title: 'Tus permisos no son suficientes para ingresar a esta sección',
				showConfirmButton: false,
				timer: 2000,
			}).then(() => {
				navigate('/');
			});
		} else {
			if (adminProductos === '' || adminProductos === undefined) {
				obtenerProductos();
			}
		}
	}, [user, infoUser.rol]);

	const columns = [
		{
			field: 'producto',
			headerName: 'Producto',
			width: 250,
			editable: true,
		},
		{
			field: 'marca',
			headerName: 'Marca',
			width: 200,
			editable: true,
		},
		{
			field: 'categoria',
			headerName: 'Categoría',
			width: 250,
			editable: true,
		},
		{
			field: 'descripcion',
			headerName: 'Descripción',
			width: 400,
			sortable: false,
			editable: true,
		},
		{
			field: 'precio',
			headerName: 'Precio',
			type: 'number',
			sortable: true,
			width: 110,
		},
		{
			field: 'existencia',
			headerName: 'Existencia',
			type: 'number',
			sortable: true,
			width: 110,
		},
	];

	const handleRowClick = (params) => {
		navigate(`/editar/${params.id}`);
	};

	return (
		<div>
			{loading && <h1 className='title'>Cargando productos...</h1>}
			{!loading && (
				<div>
					<h1 className='title'>Stock de productos</h1>
					<Box
						sx={{ width: '100%', alignContent: 'center', alignItems: 'center' }}
					>
						<Box>
							<DataGrid
								getRowId={(row) => row.id}
								rows={adminProductos}
								onRowClick={handleRowClick}
								columns={columns}
								initialState={{
									pagination: {
										paginationModel: {
											pageSize: 10,
										},
									},
								}}
								pageSizeOptions={[5, 10, 25]}
								rowLength={[20]}
								maxColumns={[6]}
							/>
						</Box>
						<Button
							className='buttonSuccess'
							startIcon={<AddCircleOutlined htmlColor={addColor} />}
							variant='text'
							id='nuevo'
							onClick={() => {
								navigate(`/editar/${nuevo_prod.id}`);
							}}
						>
							Nuevo producto
						</Button>
						<Button
							startIcon={<CachedOutlined htmlColor={refreshColor} />}
							variant='text'
							id='refresh'
							onClick={() => {
								obtenerProductos();
							}}
						>
							Recargar BBDD
						</Button>
					</Box>
				</div>
			)}
			<Importer />
		</div>
	);
};

export default StockProductos;
