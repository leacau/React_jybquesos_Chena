import './NavBar.css';

import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/cartContext';

const NavBar = () => {
	const { logOut } = useAuth();
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
						<button className='logOut' onClick={logOut}>
							LogOut
						</button>
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
