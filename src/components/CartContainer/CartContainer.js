import { useContext } from "react"
import CartContext from "../../context/cartContext"
import CartList from "../CartList/CartList"
import { Link } from 'react-router-dom'

import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../services/firebase/index'


const CartContainer =()=>{

    const { carrito } = useContext(CartContext)
    
    const { limpiarCarrito } = useContext(CartContext);

    const { getTotal } = useContext(CartContext)

    const total = getTotal()

    const handleCreateOrder = () => {

        
        
        const objOrder = {
            buyer: {
                name: 'Leandro',
                email: 'lea@lea.com',
                phone: '3221522154',
                fecha: new Date()
            },
            items: carrito,
            total
        }

        const collectionRef = collection(db, 'orders')

        addDoc(collectionRef, objOrder).then(({ id }) => {
            console.log(id);
        })

    }



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
            <h2>Total: ${total}</h2>
            <button onClick={limpiarCarrito}>Limpiar Carrito</button>
            <button onClick={handleCreateOrder}>Enviar pedido</button>
        </div>
    </div>
    )
}

export default CartContainer