import { useEffect, useState } from 'react';

import { useAuth } from '../../context/cartContext';

const ItemAdd = () => {
	const { infoUser, addProduct, newMessage, messageType } = useAuth();
	const [item, setItem] = useState();
	const Swal = require('sweetalert2');

	useEffect(() => {
		const handleChange = ({ target: { name, value } }) => {
			setItem({
				...item,
				[name]: value,
				editedBy: `${infoUser.nombre} ${infoUser.apellido}`,
			});
		};
		Swal.fire({
			title: 'Agregar un nuevo producto',
			html: `
			<form>
			<input name="marca" value='' type="text" class="form-control" placeholder="Marca" onChange=${handleChange}>
			<hr>
			<input name="producto" value='' type="text" class="form-control" placeholder="Producto" onChange=${handleChange}>
			<hr>
			<input name="precio" value='' type="number" class="form-control" placeholder="Precio" onChange=${handleChange}>
			<hr>
			<input name="descripcion" value='' type="textarea" rows="4" class="form-control" placeholder="Descripción" onChange=${handleChange}>
			<hr>
			<input name="existencia" value='' type="number" class="form-control" placeholder="Cantidad" onChange=${handleChange}>
			</form>
			`,
			icon: 'info',
			showCancelButton: true,
			showConfirmButton: item !== undefined,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, agregar producto!',
		}).then((result) => {
			console.log(item);
			if (result.isConfirmed) {
				if (
					item !== undefined ||
					(item.marca,
					item.producto,
					item.precio,
					item.descripcion,
					item.categoria,
					item.existencia) !== ''
				) {
					addProduct(
						item.marca,
						item.producto,
						item.precio,
						item.descripcion,
						item.categoria,
						item.existencia
					);
				} else {
					console.log('No se puede guardar el registro');
				}
				Swal.fire('', newMessage, messageType);
				return false;
			} else {
				return false;
			}
		});
	}, [item]);
	return false;
};

export default ItemAdd;
