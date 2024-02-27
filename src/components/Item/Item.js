import './Item.css';

import { Link } from 'react-router-dom';
import React from 'react';

const Item = ({ id, tipo, marca, img, precio }) => {
	return (
		<div className='borderCard'>
			<div className='titleCard'>
				<h3 className='titulo'>
					{marca} - {tipo}
				</h3>
				<div className='imgCard'>
					<img
						className='imagenProd'
						src={img}
						alt={`foto de una imagen de un queso ${tipo}`}
					/>
				</div>
				<p>
					Precio: <span>${precio}</span> x/Kg
				</p>
				<Link to={`/detalle/${id}`}>
					<button className='btn btn-primary'>Detalles</button>
				</Link>
			</div>
		</div>
	);
};

export default Item;
