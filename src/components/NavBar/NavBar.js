import "./NavBar.css"
import CartWidget from "../CartWidget/CartWidget"

const NavBar = () =>{
    return (
    <header className="App-header">
        <nav className='navBar'>
            <ul className='ulNav'>
                <li className='ilNav'>
                    <a className="navLink" href="#">Inicio</a>
                </li>
                <li>
                    <a className="navLink" href="#">Tienda</a>
                </li>
                <li>
                    <a className="navLink" href="#">Login</a>
                </li>
                <li>
                    <a className="navLink" href="#">Administrador</a>
                </li>
                <li>
                    <a className="navLink" href="#">0 <CartWidget /></a>
                </li>
            </ul>
        </nav>
    </header>
)}

export default NavBar