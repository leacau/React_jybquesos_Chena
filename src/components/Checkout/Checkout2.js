import { useState, useContext} from 'react'
import CartContext from "../../context/cartContext"
import { addDoc, collection, writeBatch, getDocs, query, where, documentId } from 'firebase/firestore'
import { db } from '../../services/firebase/index'




const Checkout = () => {

    const { carrito } = useContext(CartContext)

    const [checkoutInput, setCheckoutInput] = useState({
        apellido: '',
        nombre: '',
        email: '',
        telefono: '',
    })

    const handleInput = (e) => {

        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value })

    }

    const Swal = require('sweetalert2')

    const { limpiarCarrito } = useContext(CartContext);

    const { getTotal } = useContext(CartContext)

    const total = getTotal()

    const handleCreateOrder = () => { 

        if(checkoutInput.apellido === '' || checkoutInput.nombre === '' || checkoutInput.email === '' || checkoutInput.telefono === ''){

            Swal.fire({
                title: 'Faltan datos',
                text: 'Por favor complete todos los campos',
                confirmButtonText: 'Ok',
                timer: 1500
            })


        }else{  
            const objOrder = {
                buyer: {
                    name: checkoutInput.nombre,
                    lastName: checkoutInput.apellido,
                    email: checkoutInput.email,
                    phone: checkoutInput.telefono,
                    fecha: new Date()
                },
                items: carrito,
                total
            }

        const batch = writeBatch(db)

        const ids = carrito.map(item => item.id)

        const OutOfStock = []

        const collectionRef = collection(db, 'productos')

        getDocs(collection(db, 'productos')).then(docs => {
            console.log(docs.id);
        })



        getDocs(query(collectionRef, where(documentId(), 'in', ids)))
            .then(response => {
                console.log(response.docs);

                response.docs.forEach(doc => {
                    const dataDoc = doc.data()
                    const prod = carrito.find (prod => prod.id === doc.id)
                    console.log(prod);
                    const prodQuantity = prod.cantidad
                    console.log(prodQuantity);

                    if(dataDoc.existencia >= prodQuantity) {
                        batch.update(doc.ref, {
                            existencia: dataDoc.existencia - prodQuantity})
                    } else {
                        OutOfStock.push({id: doc.id, ...dataDoc})
                        Swal.fire({
                            title: 'Productos sin existencia',
                            html: `<ul>${OutOfStock.map(item => `<li>${item.nombre}</li>`).join('')}</ul>`,})
                        }
                        }).then(()=>{
                    if(OutOfStock.length === 0) {
                        const collectionRef = collection(db, 'orders')

                        addDoc(collectionRef, objOrder).then(({ id }) => {

                            batch.commit()

                            Swal.fire({
                
                                title: 'Tomá nota del Id del pedido',
                                html: `<b>${id}</b>`,
                                confirmButtonText: 'Hecho'
                
                            }).then(res=>{
                                if(res.isConfirmed){
                                    Swal.fire({
                                        title: 'Pedido realizado con éxito',
                                        html: `En breve nos pondremos en conacto para coordinar la entrega`,
                                        confirmButtonText: 'Hecho',
                                        icon: 'success'
                                    }).then(()=>{
                                        window.location = "../../"
                                        limpiarCarrito()
                                    })
                    }           
                            })
                        })

                    }
                })
            })
        }
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
        <div className='py-4'>
        
            <div className='container'>
                <div className='row'>

                    <div className='col-md-5'>
                        <div className='card'>

                            <div className='card-header'>
                                <h3>Datos de envío</h3>
                            </div>

                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        
                                            <div className='form-group mb-3'>
                                                <label>Apellido</label>
                                                <input type="text" name="apellido" className='form-control' onChange={handleInput} value={checkoutInput.apellido}></input>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>Nombre</label>
                                                <input type="text" name="nombre" className='form-control' onChange={handleInput} value={checkoutInput.nombre} required></input>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>Teléfono</label>
                                                <input type="number" name="telefono" className='form-control' onChange={handleInput} value={checkoutInput.telefono} required></input>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>Email</label>
                                                <input type="mail" name="email" className='form-control' onChange={handleInput} value={checkoutInput.email} required></input>
                                            </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-7'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map( (producto) => {
                                        const subTotal= producto.precio * producto.cantidad
                                            return (
                                                
                                                    <tr key={producto.id}>
                                                        <td>{producto.marca}-{producto.tipo}</td>
                                                        <td>{producto.cantidad}</td>
                                                        <td>$ {subTotal}</td>
                                                    </tr>
                                                    
                                        )
                                    })
                                    }
                                    <tr>
                                        <td colSpan="2">Total</td>
                                        <td colSpan="2">$ {total}</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>                       
                </div>
                
            </div>
            <button type='button' className='btn btn-primary' onClick={handleCreateOrder}>Finalizar Pedido</button>
        </div>

    )


}


export default Checkout