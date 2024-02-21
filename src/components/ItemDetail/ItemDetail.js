import './ItemDetail.css';

import React, { useContext, useEffect, useState } from 'react';

import CartContext from '../../context/cartContext';
import Contador from '../Counter/Counter';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/cartContext';

const ItemDetail = ({
	id,
	producto,
	descripcion,
	precio,
	img,
	marca,
	existencia,
}) => {
	const { addItem } = useContext(CartContext);
	const [cantidadAgregada, setCantidadAgregada] = useState(0);
	const { user } = useAuth();
	const Swal = require('sweetalert2');

	/* if (!user) {
		console.log('aca entra');
		Swal.fire({
			title: 'Para agregar productos al carrito debrás ingresar a tu cuenta',
			confirmButtonText: 'Entendido',
		});
	} */

	useEffect(() => {
		if (!user) {
			console.log('aca tambien');
			Swal.fire({
				title: 'Para agregar productos al carrito debrás ingresar a tu cuenta',
				confirmButtonText: 'Entendido',
			});
		}
	}, [user, Swal]);

	const agregar = (cantidad) => {
		addItem({ id, marca, producto, precio, cantidad, img });
		setCantidadAgregada(cantidad);
	};

	return (
		<div className='itemDetail'>
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
						{marca}
					</p>
					<p className='detalleSub'>
						<span>producto: </span>
						{producto}
					</p>
					<p className='detalleDesc'>
						<span>Descripción: </span>
						{descripcion}
					</p>
					<p className='detallePrecio'>
						<span>Precio: </span>${precio}
					</p>
				</div>
				{user && (
					<div className='counter'>
						{cantidadAgregada === 0 ? (
							<Contador inicial={0} maximo={existencia} agregar={agregar} />
						) : (
							<div>
								<Link to='/carrito'>
									<button className='btn btn-success m-2'>
										Terminar compra
									</button>
								</Link>
								<br></br>
								<Link to={-1}>
									<button className='btn btn-secondary m-2'>
										Continuar comprando
									</button>
								</Link>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemDetail;
