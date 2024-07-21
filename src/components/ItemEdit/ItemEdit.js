import './ItemEdit.css';

import {
	DeleteForeverOutlined,
	SaveAltOutlined,
	SettingsBackupRestoreOutlined,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';

import { db } from '../../services/firebase';
import { useAuth } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const ItemEdit = ({
	id,
	producto,
	descripcion,
	precio,
	img,
	marca,
	existencia,
	categoria,
}) => {
	const [updateData, setUpdateData] = useState();
	const { infoUser } = useAuth();
	const navigate = useNavigate();
	const Swal = require('sweetalert2');

	useEffect(() => {
		if (infoUser.rol !== 'admin') {
			Swal.fire({
				position: 'top-end',
				icon: 'info',
				title: 'Tus permisos no son suficientes para ingresar a esta sección',
				showConfirmButton: false,
				timer: 2000,
			}).then(() => {
				navigate('/');
			});
		}
		setUpdateData({
			producto: producto,
			descripcion: descripcion,
			precio: precio,
			img: img ? img : '',
			marca: marca,
			existencia: existencia,
			categoria: categoria,
		});
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setUpdateData({ ...updateData, [e.target.name]: e.target.value });
	};

	const handleCancel = () => {
		Swal.fire({
			position: 'top-end',
			icon: 'info',
			title: 'Modificación cancelada',
			showConfirmButton: true,
		}).then(() => {
			navigate('/admin');
		});
	};

	const handlerModif = async () => {
		if (id === 'nuevo_prod') {
			const updateInfo = {
				producto: updateData.producto,
				descripcion: updateData.descripcion,
				precio: parseFloat(updateData.precio).toFixed(2),
				marca: updateData.marca,
				existencia: parseInt(updateData.existencia),
				categoria: updateData.categoria,
			};
			await addDoc(collection(db, 'productos'), updateInfo)
				.then(() => {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Producto agregado',
						showConfirmButton: true,
					}).then(() => {
						navigate('/admin');
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
			const docRef = doc(db, 'productos', id);
			const updateInfo = {
				producto: updateData.producto,
				descripcion: updateData.descripcion,
				precio: parseFloat(updateData.precio),
				img: updateData.img,
				marca: updateData.marca,
				existencia: parseInt(updateData.existencia),
				categoria: updateData.categoria,
			};
			await updateDoc(docRef, updateInfo)
				.then(() => {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Modificación exitosa',
						showConfirmButton: true,
					}).then(() => {
						navigate('/admin');
					});
				})
				.catch(() => {
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: 'Error al modificart el producto',
						showConfirmButton: true,
					});
				});
		}
	};

	const handlerDelet = () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success m-2',
				cancelButton: 'btn btn-danger m-2',
			},
			buttonsStyling: false,
		});
		swalWithBootstrapButtons
			.fire({
				title: '¿Eliminar producto?',
				text: 'No podrás revertir esta acción',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Si, eliminar!',
				cancelButtonText: 'No, cancelar',
				reverseButtons: true,
			})
			.then(async (result) => {
				if (result.isConfirmed) {
					await deleteDoc(doc(db, 'productos', id));
					swalWithBootstrapButtons.fire({
						title: 'Eliminado!',
						text: 'El producto ha sido eliminado!',
						icon: 'success',
					});
					navigate('/admin');
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalWithBootstrapButtons.fire({
						title: 'Cancelado',
						text: 'El producto está a salvo :)',
						icon: 'error',
					});
				}
			});
	};

	return (
		<div className='itemDetail'>
			<div className='container2'>
				{id !== 'nuevo_prod' ? (
					<div className='img'>
						<img
							className='detalleImg'
							src={img}
							alt={`foto de una imagen de un ${categoria} ${producto}`}
						/>
					</div>
				) : (
					<div className='img'>
						<img className='detalleImg' />
						Agregar imagen de producto!!!
					</div>
				)}
				<div className='descrip'>
					<p className='detalleSub'>
						<span>Marca: </span>
						<textarea
							name='marca'
							rows={1}
							cols={25}
							onChange={handleChange}
							defaultValue={marca}
						/>
					</p>
					<p className='detalleSub'>
						<span>Producto: </span>
						<textarea
							name='producto'
							rows={2}
							cols={25}
							onChange={handleChange}
							defaultValue={producto}
						/>
					</p>
					<p className='detalleSub'>
						<span>categoria: </span>
						<textarea
							name='categoria'
							rows={2}
							cols={25}
							onChange={handleChange}
							defaultValue={categoria}
						/>
					</p>
					<p className='detalleDesc'>
						<span>Descripción: </span>
						<textarea
							name='descripcion'
							rows={4}
							cols={25}
							onChange={handleChange}
							defaultValue={descripcion}
						/>
					</p>
					<p className='detallePrecio'>
						<span>Precio: </span>
						<textarea
							name='precio'
							rows={1}
							cols={10}
							typeof='number'
							onChange={handleChange}
							defaultValue={precio}
						/>
					</p>
					<p className='detallePrecio'>
						<span>Stock: </span>
						<textarea
							name='existencia'
							rows={1}
							cols={10}
							typeof='number'
							onChange={handleChange}
							defaultValue={existencia}
						></textarea>
					</p>
					<button className='btn btn-primary p-1 m-3' onClick={handleCancel}>
						<SettingsBackupRestoreOutlined /> Cancelar cambios
					</button>
					<button className='btn btn-success p-1 m-3' onClick={handlerModif}>
						<SaveAltOutlined /> Guardar cambios
					</button>
					{id !== 'nuevo_prod' && (
						<button className='btn btn-danger p-1 m-3' onClick={handlerDelet}>
							<DeleteForeverOutlined /> Eliminar Producto
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ItemEdit;
