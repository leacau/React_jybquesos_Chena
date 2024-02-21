import './CartList.css';

import ItemCart from '../ItemCart/ItemCart';
import React from 'react';
import { useAuth } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const CartList = ({ productosEnCarrito }) => {
	const { user } = useAuth();
	const Swal = require('sweetalert2');
	const navigate = useNavigate();

	if (!user && (productosEnCarrito === null || productosEnCarrito === '')) {
		Swal.fire({
			position: 'top-end',
			icon: 'info',
			title: 'Debés iniciar sesión para aceeder al carrito',
			showConfirmButton: false,
			timer: 2000,
		}).then(() => {
			navigate('/login');
		});
	} else {
		return (
			<div className='cartList'>
				{productosEnCarrito.map((producto) => (
					<ItemCart key={producto.id} {...producto} />
				))}
			</div>
		);
	}
};

export default CartList;
