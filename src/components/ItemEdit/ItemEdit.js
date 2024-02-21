import './ItemEdit.css';

import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

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
}) => {
	const { infoUser } = useAuth();
	const navigate = useNavigate();
	const Swal = require('sweetalert2');
	const [modification, setModification] = useState({
		producto: '',
		descripcion: '',
		precio: '',
		marca: '',
		existencia: '',
	});

	const handleChange = ({ target: { name, value } }) => {
		setModification({ ...modification, [name]: value });
	};

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
	}, []);

	const handlerModif = async (e) => {
		e.preventDefault();
		console.log('Ejecutado');
		const docRef = doc(db, 'productos', id);

		const updateData = {
			producto:
				modification.producto !== '' ? modification.producto : `${producto}`,
			descripcion:
				modification.descripcion !== ''
					? modification.descripcion
					: `${descripcion}`,
			precio: modification.precio !== '' ? modification.precio : `${precio}`,
			marca: modification.marca !== '' ? modification.marca : `${marca}`,
			existencia:
				modification.existencia !== ''
					? modification.existencia
					: `${existencia}`,
			editedBy: `${infoUser.nombre} ${infoUser.apellido}`,
		};

		await updateDoc(docRef, updateData)
			.then(() => {
				Swal.fire({
					position: 'top-centre',
					icon: 'success',
					title: 'Modificación exitosa',
					showConfirmButton: true,
				});
				navigate('/admin');
			})
			.catch(() => {
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: 'Error al modificart el producto',
					showConfirmButton: true,
				});
			});
	};

	return (
		<div className='itemDetail' id='formulario'>
			<div className='container2'>
				<div className='img'>
					<img
						className='detalleImg'
						src={img}
						alt={`foto de una imagen de un queso ${producto}`}
					/>
				</div>
				<div className='descrip'>
					<p className='detalleSub'>
						<span>Marca: </span>
						<textarea
							name='marca'
							rows={1}
							cols={25}
							defaultValue={marca}
							onChange={handleChange}
						></textarea>
					</p>
					<p className='detalleSub'>
						<span>Producto: </span>
						<textarea
							name='producto'
							rows={2}
							cols={25}
							defaultValue={producto}
							onChange={handleChange}
						></textarea>
					</p>
					<p className='detalleDesc'>
						<span>Descripción: </span>
						<textarea
							name='descripcion'
							rows={4}
							cols={25}
							defaultValue={descripcion}
							onChange={handleChange}
						></textarea>
					</p>
					<p className='detallePrecio'>
						<span>Precio: </span>
						<textarea
							name='precio'
							rows={1}
							cols={10}
							defaultValue={precio}
							onChange={handleChange}
						></textarea>
					</p>
					<p className='detallePrecio'>
						<span>Stock: </span>
						<textarea
							name='existencia'
							rows={1}
							cols={10}
							defaultValue={existencia}
							onChange={handleChange}
						></textarea>
					</p>
					<button
						className='btn btn-warning p-1 m-3'
						onClick={() => {
							navigate('/admin');
						}}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							className='bi bi-arrow-clockwise'
							viewBox='0 0 16 16'
						>
							<path
								fillRule='evenodd'
								d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'
							/>
							<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z' />
						</svg>
						Cancelar cambios
					</button>
					<button className='btn btn-primary p-1 m-3' onClick={handlerModif}>
						Guardar cambios
					</button>
				</div>
			</div>
		</div>
	);
};

export default ItemEdit;
