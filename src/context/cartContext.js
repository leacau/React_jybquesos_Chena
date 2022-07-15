import { useEffect, useState, createContext } from "react";


const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [cantProductos, setCantProductos] = useState(0)


    const addItem = (agregarProduct) =>{
        const Swal = require('sweetalert2')

        if(!carrito.some(prod => prod.id === agregarProduct.id) ){
           setCarrito([...carrito, agregarProduct]) 
           Swal.fire({
            title: 'producto agregado',
            position: 'top',
            background: '#defde0',
            timer: 1000
        })
        }
    }

    const quitarItem = (id) => {
        const nuevoCarrito = carrito.filter(prod => prod.id !== id)
        setCarrito(nuevoCarrito)
    }

    const limpiarCarrito = () => {
        setCarrito([])
    }

    const getTotal = () =>{
        let total = 0
        let subtotal = 0
        carrito.forEach(item => {
            subtotal = item.cantidad * item.precio
            total += subtotal
        });
        return total 
    }

    
    useEffect(() => {
        let cantProductos = 0
        carrito.forEach(prod => {
            cantProductos += prod.cantidad
        })
        setCantProductos(cantProductos)
    }, [carrito])


    return(
        <CartContext.Provider value={ { carrito, addItem, quitarItem, cantProductos, limpiarCarrito, getTotal } }>
            { children }        
        </CartContext.Provider>

    )
}

export default CartContext;

