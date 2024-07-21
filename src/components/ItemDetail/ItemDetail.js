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
	const { addItem, carrito } = useContext(CartContext);
	const [cantidadAgregada, setCantidadAgregada] = useState(0);
	const { user } = useAuth();
	const Swal = require('sweetalert2');

	useEffect(() => {
		if (!user) {
			Swal.fire({
				title: 'Para agregar productos al carrito deberás ingresar a tu cuenta',
				confirmButtonText: 'Entendido',
			});
		}
	}, [user, Swal]);

	const productCount = carrito.filter((item) => item.id === id);
	const startCount = productCount.length === 0 ? 0 : productCount[0].cantidad;

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
					<p className='detalleTit'>Marca:</p>
					<p className='detalleText'>{marca}</p>

					<p className='detalleTit'>Tipo:</p>
					<p className='detalleText'>{producto}</p>

					<p className='detalleTit'>Descripción:</p>
					<p className='detalleText'>{descripcion}</p>

					<p className='detalleTit'>Precio:</p>
					<p className='detalleText'>${precio}</p>
				</div>
				{user && (
					<div className='counter'>
						{cantidadAgregada === 0 ? (
							<Contador
								inicial={startCount !== undefined ? startCount : 0}
								maximo={existencia}
								agregar={agregar}
							/>
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
