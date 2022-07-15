import { useState, useContext} from 'react'
import CartContext from "../../context/cartContext"
import { addDoc, collection, writeBatch, getDocs, query, where, documentId } from 'firebase/firestore'
import { db } from '../../services/firebase/index'
import { Link } from 'react-router-dom'




const Checkout = () => {
    const [loading, setLoading] = useState(false)

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

    const { carrito, getTotal, limpiarCarritoFunc } = useContext(CartContext)

    const Swal = require('sweetalert2')

    const total = getTotal()

    const handleCreateOrder = () => {
        setLoading(true)
          
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

        const outOfStock = []

        const collectionRef = collection(db, 'productos')

        getDocs(query(collectionRef, where(documentId(), 'in', ids)))
            .then(response => {
                response.docs.forEach(doc => {
                    const dataDoc = doc.data()

                    const prodCarr = carrito.find(prod => prod.id === doc.id)
                    const prodCarrCantidad = prodCarr.cantidad

                    if(dataDoc.existencia >= prodCarrCantidad) {

                        batch.update(doc.ref, {
                            existencia: dataDoc.existencia - prodCarrCantidad })
                  
                    } else {
                        outOfStock.push({id: doc.id, ...dataDoc})
                    }

                })
            }).then(() => {

                if(outOfStock.length === 0) {

                    if(checkoutInput.apellido === '' || checkoutInput.nombre === '' || checkoutInput.email === '' || checkoutInput.telefono === ''){

                        return Promise.reject({ type: 'emptyInfo' })                                                               
            
                    } else {

                        const collectionRef = collection(db, 'orders')

                        return addDoc(collectionRef, objOrder)
                    }

                } else {

                    return Promise.reject({ type: 'outOfStock', data: outOfStock })

                }

            }).then(({ id }) => {

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
                        }).then((response)=>{
                            if(response.isConfirmed){
                                window.location = "../../"
                                limpiarCarritoFunc('no')
                            }
                        })
                    }           
                })

            }).catch(error => {

                if(error.type === 'outOfStock') {

                    Swal.fire({
                        title: 'Productos sin existencia',
                        html: `<b>${error.data.map(item => `${item.marca}-${item.tipo}. Stock:(${item.existencia})`).join(', ')}</b>`,
                        confirmButtonText: 'Ok'

                    })

                } else if(error.type === 'emptyInfo') {

                    Swal.fire({
                        title: 'Faltan datos de contacto',
                        text: 'Por favor complete todos los campos',
                        confirmButtonText: 'Ok',
                        timer: 1500
                    })

                } else {

                    Swal.fire({
                        title: 'Error',
                        text: 'Ha ocurrido un error, por favor intente nuevamente',
                        confirmButtonText: 'Ok'
                    })
                }
            }).finally(() => {

                setLoading(false)

            })

    }

    if(loading) {
        return <h1>Se esta generando su orden...</h1>
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
                                                <input type="text" name="nombre" className='form-control' onChange={handleInput} value={checkoutInput.nombre}></input>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>Teléfono</label>
                                                <input type="number" name="telefono" className='form-control' onChange={handleInput} value={checkoutInput.telefono}></input>
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>Email</label>
                                                <input type="mail" name="email" className='form-control' onChange={handleInput} value={checkoutInput.email}></input>
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
            <button type='button' className='btn btn-success m-3' onClick={handleCreateOrder}>Finalizar Pedido</button>
            <Link to='/carrito'><button type='button' className='btn btn-warning m-3'>Volver al carrito</button></Link>
        </div>

    )


}


export default Checkout