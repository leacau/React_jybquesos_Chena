import "./NavBar.css"
import CartWidget from "../CartWidget/CartWidget"
import { Link } from 'react-router-dom'

const NavBar = () =>{
    return (
    <header className="App-header">
        <nav className='navBar'>
            <ul className='ulNav'>
                <li className='ilNav'>
                   < Link className="navLink" to='/'>Inicio</Link>
                </li>
                <li>
                    < Link to='/categoria/quesos' className="navLink">Quesos</Link>
                </li>
                <li>
                    < Link to='/categoria/otros' className="navLink">Otros</Link>
                </li>
                <li>
                    <>0<CartWidget /></>
                </li>
            </ul>
        </nav>
    </header>
)}

export default NavBar