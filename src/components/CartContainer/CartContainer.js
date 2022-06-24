import { useContext } from "react"
import CartContext from "../../context/cartContext"
import CartList from "../CartList/CartList"
import { Link } from 'react-router-dom'


const CartContainer =()=>{

    const { carrito } = useContext(CartContext)
    
    const { limpiarCarrito } = useContext(CartContext);

    console.log(carrito.length);

    if(carrito.length<1){
       return(
        <>
            <div>
                <h2>No hay productos en el carrito.</h2>
                <br></br>
                <Link to='/' className='linkIrHome'><h4>Ir al catálogo de productos</h4></Link>
            </div>
        </>
        )
    }

    return (
    <div>
        <div className="catalogo">
            <CartList productosEnCarrito={carrito} />
        </div>
        <div>
            <button onClick={limpiarCarrito}>Limpiar Carrito</button>
        </div>
    </div>
    )
}

export default CartContainer