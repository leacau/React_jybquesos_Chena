import './NavBar.css';

import React, { useEffect, useState } from 'react';

import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/cartContext';

const NavBar = () => {
	const { user, getUserData, infoUser, logOut } = useAuth();
	const [stock, setStock] = useState('');

	useEffect(() => {
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
	}, [user, infoUser.rol]);

	return (
		<header className='App-header'>
			<nav className='navBar'>
				<ul className='ulNav'>
					<li className='ilNav'>
						<Link className='navLink' to='/'>
							Inicio
						</Link>
					</li>
					<li>
						<Link to='/categoria/quesos' className='navLink'>
							Quesos
						</Link>
					</li>
					<li>
						<Link to='/categoria/otros' className='navLink'>
							Otros
						</Link>
					</li>
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

					{/* 			<li>
						{infoUser.rol === 'admin' && (
							<Link to='/admin' className='navLink'>
								Panel Admin
							</Link>
						)}
					</li> */}
					<li className='widget'>
						<CartWidget />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default NavBar;
