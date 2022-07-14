import { useContext } from "react"
import CartContext from "../../context/cartContext"
import CartList from "../CartList/CartList"
import { Link } from 'react-router-dom'


const CartContainer =()=>{

    const Swal = require('sweetalert2')

    const { carrito } = useContext(CartContext)
    
    const { limpiarCarrito } = useContext(CartContext);

    const { getTotal } = useContext(CartContext)

    const total = getTotal()

    if(carrito.length<1){
       return(
            Swal.fire({
                title: 'Su carrito está vacío',
                confirmButtonText: 'Ok',
                timer: 1500
            }).then(()=>{
                window.location = "../../"
            })          
        )
    }

    return (
    <div>
        <div className="catalogo">
            <CartList productosEnCarrito={carrito} />
        </div>
        <div>
            <h2>Total: ${total}</h2>
            <button onClick={limpiarCarrito}>Limpiar Carrito</button>
            < Link to='/checkout'><button>Realizar pedido</button></Link>
        </div>
    </div>
    )
}

export default CartContainer