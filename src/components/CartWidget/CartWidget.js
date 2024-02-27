import './CartWidget.css';

import React, { useContext } from 'react';

import CartContext from '../../context/cartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
	const { cantProductos } = useContext(CartContext);

	const totalProductos = cantProductos;

	return (
		<>
			{totalProductos !== 0 && (
				<div>
					<Link className='btn-flotante' to='/carrito'>
						<img
							className='imgCart'
							src='../img/CartWidget.png'
							alt='Carrito de compras'
						/>
						<div className='cantidad-carrito'>{totalProductos}</div>
					</Link>
				</div>
			)}
		</>
	);
};

export default CartWidget;
