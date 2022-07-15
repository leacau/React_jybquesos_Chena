import { useEffect, useState, createContext } from "react";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [cantProductos, setCantProductos] = useState(0)


    const addItem = (agregarProduct) =>{
        const Swal = require('sweetalert2')

        if(!carrito.some(prod => prod.id === agregarProduct.id)&& agregarProduct.cantidad > 0){
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

        const Swal = require('sweetalert2')

        Swal.fire({
            title: '¡Estás por quitar un producto!',
            text: "¿Estás seguro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quitar producto!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Producto quitado!',
                icon: 'success'
              })
              const nuevoCarrito = carrito.filter(prod => prod.id !== id)
              setCarrito(nuevoCarrito)
            }
          })       


    }

    const limpiarCarrito = () => {
        const Swal = require('sweetalert2')

        Swal.fire({
            title: 'Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, limpiar carrito!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Carrito limpio!',
                'Los productos fueron eliminados del carrito',
                'success'
              )
              setCarrito([]) 
            }
          })       
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

    const limpiarCarritoFunc = (mostrarMensaje) =>{
      
      const Swal = require('sweetalert2')

      if(mostrarMensaje === 'yes'){
        
        Swal.fire({
          title: 'Estás seguro?',
          text: "No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, limpiar carrito!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Carrito limpio!',
              'Los productos fueron eliminados del carrito',
              'success'
            )
            setCarrito([]) 
          }
        }) 
      }else{
        setCarrito([])
      }
            
    }

    
    useEffect(() => {
        let cantProductos = 0
        carrito.forEach(prod => {
            cantProductos += prod.cantidad
        })
        setCantProductos(cantProductos)
    }, [carrito])


    return(
        <CartContext.Provider value={ { carrito, addItem, quitarItem, cantProductos, limpiarCarrito, getTotal, limpiarCarritoFunc } }>
            { children }        
        </CartContext.Provider>

    )
}

export default CartContext;

