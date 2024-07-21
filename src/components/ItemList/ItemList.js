import './ItemList.css';

import Item from '../Item/Item';
import React from 'react';

const ItemList = ({ productos }) => {
	if (productos !== undefined) {
		return (
			<div className='itemList'>
				{productos.map((producto) => (
					<Item key={producto.id} {...producto} />
				))}
			</div>
		);
	} else {
		return <div>... cargando listado</div>;
	}
};

export default ItemList;
