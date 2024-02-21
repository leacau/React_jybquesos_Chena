import './NavBar.css';

import React, { useEffect } from 'react';

import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/cartContext';

const NavBar = () => {
	const { user, getUserData, infoUser, logOut } = useAuth();
	const existeUser = user;

	useEffect(() => {
		if (existeUser !== null) {
			console.log(existeUser);
			console.log(user);
			getUserData(user.uid);
		}
	}, [user]);

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
					<li>
						{user !== null && (
							<button
								className='logOut'
								onClick={() => {
									logOut();
								}}
							>
								LogOut
							</button>
						)}
						{user === null && (
							<Link to='/login' className='navLink'>
								Login
							</Link>
						)}
					</li>
					<li>
						{infoUser !== undefined && infoUser.rol === 'admin' && (
							<Link to='/admin' className='navLink'>
								Panel Admin
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
