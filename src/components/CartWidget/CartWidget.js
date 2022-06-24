import { useContext } from "react"
import CartContext from "../../context/cartContext"
import { Link } from "react-router-dom"

const CartWidget = () =>{

    const { cantProductos } = useContext( CartContext )

    const totalProductos = cantProductos
    console.log(totalProductos);

    if(totalProductos<1){
        return <></>
    }

    return(
    <>
        <Link to='/carrito'><img src='../img/CartWidget.png' alt="Carrito de compras" /> { totalProductos }</Link>

    </>
)}

export default CartWidget