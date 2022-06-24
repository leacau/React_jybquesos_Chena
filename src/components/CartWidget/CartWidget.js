import { useContext } from "react"
import CartContext from "../../context/cartContext"
import { Link } from "react-router-dom"

const CartWidget = () =>{

    const { cantProductos } = useContext( CartContext )

    const totalProductos = cantProductos
    console.log(totalProductos);

    return(
    <>
        {(totalProductos!==0) && (<Link to='/carrito'><img src='../img/CartWidget.png' alt="Carrito de compras" /> { totalProductos }</Link>)}

    </>
)}

export default CartWidget