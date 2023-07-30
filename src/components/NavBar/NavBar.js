import './NavBar.css';

import AdminModule from '../Administrator/Administrator';
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../context/cartContext';
import { useEffect } from 'react';

const NavBar = () => {
	const { user, getUserData, infoUser } = useAuth();
	const logOut = () => signOut(auth);

	useEffect(() => {
		if (user) {
			getUserData(user.uid);
		}
	}, [user, getUserData]);

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
					<li>
						{infoUser.rol === 'admin' && (
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
