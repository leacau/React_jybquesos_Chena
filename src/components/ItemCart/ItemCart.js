import './ItemCart.css';

import React, { useContext } from 'react';

import CartContext from '../../context/cartContext';

const ItemCart = ({ id, producto, marca, img, precio, cantidad }) => {
	const subtotal = precio * cantidad;
	const { quitarItem } = useContext(CartContext);

	const deleteItem = () => {
		quitarItem(id);
	};
	return (
		<div className='detalleItemCart rounded'>
			<>
				<img
					className='imagenProdCart'
					src={img}
					alt={`foto de una imagen de un queso ${producto}`}
				/>
			</>
			<div>
				<span>Producto: </span>
				{producto} ({marca})
			</div>
			<div>
				<span>Precio xKg: </span>${precio}
			</div>
			<div>
				<span>Cantidad: </span>
				{cantidad}
			</div>
			<div>
				<span>Subtotal: </span>${subtotal}
			</div>
			<button onClick={deleteItem} className='btn btn-danger p-1 m-3'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='22'
					height='22'
					fill='currentColor'
					className='bi bi-trash'
					viewBox='0 0 16 16'
				>
					<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
					<path
						fillRule='evenodd'
						d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
					/>
				</svg>
			</button>
		</div>
	);
};

export default ItemCart;
