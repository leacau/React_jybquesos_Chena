import { useState } from 'react'
import { useContext } from "react"
import CartContext from "../../context/cartContext"
import CartList from '../CartList/CartList'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../services/firebase/index'




function Checkout() {

    const { carrito } = useContext(CartContext)

    const [checkoutInput, setCheckoutInput] = useState({
        apellido: '',
        nombre: '',
        email: '',
        telefono: '',
    })

    const Swal = require('sweetalert2')

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

            Swal.fire({

                title: 'Tomá nota del Id del pedido',
                html: `<b>${id}</b>`,
                confirmButtonText: 'Hecho'

              }).then(res=>{
                if(res.isConfirmed){
                    Swal.fire('Tu pedido ha sido procesado')
                    limpiarCarrito();
                }
                setTimeout(() => {
                    window.location = "../../"
                }, 1500);
            
            })
        })

    }

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
            <h4>Acà estamos</h4>
            <div>
                <label>Apellido: </label>
                <input type="text" name="apellido" required></input>
            </div>
            <div>
                <label>Nombre: </label>
                <input type="text" name="nombre" required></input>
            </div>
            <div>
                <label>Teléfono: </label>
                <input type="number" name="telefono" required></input>
            </div>
            <div>
                <label>Email: </label>
                <input type="mail" name="email" required></input>
            </div>
            <div>
            <CartList productosEnCarrito={carrito} />
            {carrito.map( (producto) => {
                return (
                    <div key={producto.id}>
                        <h4>{producto.marca}-{producto.tipo}</h4>
                        <p>{producto.precio}</p>
                    </div>
                )
            })
            }
            </div>
        </div>

    )


}


export default Checkout