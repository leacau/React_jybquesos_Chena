import { useContext } from "react"
import CartContext from "../../context/cartContext"

const CartWidget = () =>{

    const { cantProductos } = useContext( CartContext )

    const totalProductos = cantProductos
    console.log(totalProductos);

return(
    <>
        <img src='../img/CartWidget.png' alt="Carrito de compras" /> { totalProductos }

    </>
)}

export default CartWidget