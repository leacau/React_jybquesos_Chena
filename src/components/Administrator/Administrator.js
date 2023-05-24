import React, { useEffect, useState } from 'react';

import { StockProductos } from './../Stock/Stock';
import { auth } from '../../services/firebase';

const AdminModule = () => {
	const [user, setUser] = useState(null);
	console.log(user);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				if (user.email === 'leandrochena@gmail.com') {
					// El usuario está autenticado
					setUser(user);
				}
			} else {
				// El usuario no está autenticado, redireccionar a la página de inicio de sesión
				setUser(null);
				// Redireccionar aquí usando la biblioteca de enrutamiento que estés utilizando
			}
		});

		return () => unsubscribe();
	}, []);

	if (!user) {
		return <div>Cargando...</div>;
	}

	return (
		<div>
			<h2>Módulo de administrador</h2>
			{/* Aquí puedes mostrar el formulario para agregar productos y administrar los existentes */}
		</div>
	);
};

export default AdminModule;
