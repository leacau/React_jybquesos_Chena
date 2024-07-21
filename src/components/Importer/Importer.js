import '../../App.css';

import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import Papa from 'papaparse';
import { db } from '../../services/firebase';
import { useAuth } from '../../context/cartContext';

const Importer = () => {
	const { adminProductos } = useAuth();
	const [data, setData] = useState([]);
	const Swal = require('sweetalert2');

	// parse CSV data & store it in the component state

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		Papa.parse(file, {
			header: true,
			complete: (results) => {
				const allData = results.data;
				const dataFiltered = allData.filter((item) => item.id !== '');
				setData(dataFiltered);
			},
		});
	};

	const handleRowClick = (params) => {
		setData(data.filter((item) => item.id !== params.id));
	};

	const agregarProducto = (id, prod) => {
		Swal.fire({
			title: 'Seguro que querés agregar este producto a la base?',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'No agregar',
			confirmButtonColor: '#237317',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, agregalo!',
		}).then(async (result) => {
			if (result.isConfirmed) {
				await addDoc(collection(db, 'productos'), prod)
					.then(() => {
						setData(data.filter((item) => item.id !== id));
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Producto agregado',
							showConfirmButton: true,
						});
					})
					.catch(() => {
						Swal.fire({
							position: 'top-end',
							icon: 'error',
							title: 'Error al agregar el producto',
							showConfirmButton: true,
						});
					});
			} else {
				Swal.fire({
					title: 'No se agregó el producto.',
					icon: 'info',
				});
			}
		});
	};

	const handleAddItem = (id, prod) => {
		// controlar que el producto no exista
		const prodSimil = adminProductos.filter(
			(product) =>
				product.producto === prod.producto && product.marca === prod.marca
		);
		if (prodSimil.length === 0) {
			agregarProducto(id, prod);
		} else {
			Swal.fire({
				title: 'Hay otro producto similar o igual en la base de datos',
				icon: 'warning',
				showCancelButton: true,
				cancelButtonText: 'No agregar',
				confirmButtonColor: '#237317',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, agregalo!',
			}).then((result) => {
				if (result.isConfirmed) {
					agregarProducto(id, prod);
				} else {
					Swal.fire({
						title: 'No se agregó el producto.',
						icon: 'info',
					});
				}
			});
		}
	};

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
			editable: true,
			sortable: true,
			width: 110,
		},
		{
			field: 'existencia',
			headerName: 'Existencia',
			type: 'number',
			editable: true,
			sortable: true,
			width: 110,
		},
		{
			field: 'action',
			headerName: 'Eliminar',
			width: 80,
			sortable: false,
			disableClickEventBubbling: true,

			renderCell: (params) => {
				const onClick = (e) => {
					e.preventDefault();
					const currentRow = params.row;
					handleRowClick(currentRow);
				};
				return (
					<Stack direction='row' spacing={2}>
						<Button
							variant='contained'
							color='error'
							size='small'
							onClick={onClick}
						>
							<DeleteForeverOutlined />
						</Button>
					</Stack>
				);
			},
		},
		{
			field: 'add',
			headerName: 'Agregar',
			width: 80,
			sortable: false,
			disableClickEventBubbling: true,
			renderCell: (params) => {
				const onClick = (e) => {
					e.preventDefault();
					const id = params.row.id;
					const item2 = {
						producto: params.row.producto,
						descripcion: params.row.descripcion,
						precio: params.row.precio,
						img: '',
						marca: params.row.marca,
						existencia: params.row.existencia,
						categoria: params.row.categoria,
					};
					handleAddItem(id, item2);
				};
				return (
					<Stack direction='row' spacing={2}>
						<Button
							variant='contained'
							color='success'
							size='small'
							onClick={onClick}
						>
							<AddCircleOutlineOutlinedIcon />
						</Button>
					</Stack>
				);
			},
		},
	];

	return (
		<div className='App'>
			<input type='file' accept='.csv' onChange={handleFileUpload} />
			{data.length !== 0 ? (
				<div>
					<h1 className='title'>Importar productos</h1>
					<Box
						sx={{ width: '100%', alignContent: 'center', alignItems: 'center' }}
					>
						<Box>
							<DataGrid
								getRowId={(row) => row.id}
								rows={data}
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
					</Box>
				</div>
			) : null}
		</div>
	);
};

export default Importer;
