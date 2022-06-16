import { useContext } from "react"
import CartContext from "../../context/cartContext"
import CartList from "../CartList/CartList"

const CartContainer =()=>{

    const { carrito } = useContext(CartContext)
    
    const { limpiarCarrito } = useContext(CartContext);

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