import './NavBar.css';

import React, { useEffect, useState } from 'react';

import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/cartContext';

const NavBar = () => {
	const { user, getUserData, infoUser, logOut, productos, loading } = useAuth();
	const [stock, setStock] = useState('');
	const [menuItems, setMenuItems] = useState('');
	const [categoria, setCategoria] = useState([]);

	useEffect(() => {
		if (loading) {
		} else {
			if (user) {
				getUserData(user.uid);
			}

			if (infoUser.rol === 'admin') {
				setStock(
					<li>
						{infoUser.rol === 'admin' && (
							<Link to='/admin' className='navLink'>
								Panel Admin
							</Link>
						)}
					</li>
				);
			} else {
				setStock('');
			}

			if (productos) {
				let CategoriasTodas = [];

				productos.forEach((product) => {
					CategoriasTodas.push(product.categoria);
				});

				const dataArr = new Set(CategoriasTodas);

				setCategoria([...dataArr]);
				const listItems = categoria.map((data) => (
					<li key={data + 1}>
						<Link to={'categoria/' + data} className='navLink' key={data + 1}>
							{data}
						</Link>
					</li>
				));
				setMenuItems(listItems);
			}
		}
	}, [user, infoUser.rol, productos, setCategoria, loading]);

	return (
		<header className='App-header'>
			<nav className='navBar'>
				<ul className='ulNav'>
					<li className='ilNav'>
						<Link className='navLink' to='/'>
							Inicio
						</Link>
					</li>
					{menuItems}
					{stock}
					<li>
						{user && (
							<button className='logOut' onClick={logOut}>
								LogOut
							</button>
						)}
						{!user && (
							<Link to='/login' className='navLink'>
								Login
							</Link>
						)}
					</li>
					<li className='widget'>
						<CartWidget />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default NavBar;
