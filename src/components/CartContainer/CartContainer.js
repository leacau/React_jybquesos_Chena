import './CartContainer.css';

import CartContext from '../../context/cartContext';
import CartList from '../CartList/CartList';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContainer = () => {
	const navigate = useNavigate();

	const Swal = require('sweetalert2');

	const { carrito } = useContext(CartContext);

	const { limpiarCarrito } = useContext(CartContext);

	const { getTotal } = useContext(CartContext);

	const total = getTotal();

	if (carrito.length < 1) {
		Swal.fire({
			title: 'Su carrito está vacío',
			timer: 1500,
		}).then(() => {
			navigate('/');
		});
	}

	return (
		<div>
			<div className='catalogo container py-4'>
				<CartList productosEnCarrito={carrito} />
			</div>
			<div>
				<h2>Total: ${total}</h2>
				<button onClick={limpiarCarrito} className='btn btn-danger p-1 m-3'>
					Limpiar Carrito
				</button>
				<Link to='/'>
					<button className='btn btn-secondary p-1 m-3'>
						Continuar comprando
					</button>
				</Link>
				<Link to='/checkout'>
					<button className='btn btn-primary p-1 m-3'>Realizar pedido</button>
				</Link>
			</div>
		</div>
	);
};

export default CartContainer;
