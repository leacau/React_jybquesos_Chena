import ItemCart from '../ItemCart/ItemCart'
import "./CartList.css"


const CartList = ({ productosEnCarrito }) =>{

    return(
        <div className='cartList'>
            {productosEnCarrito.map (producto => <ItemCart key={producto.id} {...producto} /> )}
        </div>
    )
}

export default CartList