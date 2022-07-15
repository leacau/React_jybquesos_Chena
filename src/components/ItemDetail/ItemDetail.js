import "./ItemDetail.css"
import Contador from "../Counter/Counter"
import { useContext, useState } from "react"
import CartContext from "../../context/cartContext"
import { Link } from 'react-router-dom'

const ItemDetail = ({ id, tipo, descripción, precio, img, marca, existencia }) => {
    
    const { addItem } = useContext( CartContext )
    const [cantidadAgregada, setCantidadAgregada] = useState(0)

    const agregar = (cantidad) => {
        /* mensaje de agregado va acá */
        addItem({id, marca, tipo, precio, cantidad, img})
        setCantidadAgregada(cantidad)
    }

    return (
        <div className="container2">
            <div className="img">
            <img className="detalleImg" src={img} alt={`foto de una imagen de un queso ${tipo}`}/>
            </div>
            <div className="descrip">
                <p className="detalleSub"><span>Marca: </span>{marca}</p>
                <p className="detalleSub"><span>Tipo: </span>{tipo}</p>
                <p className="detalleDesc"><span>Descripción: </span>{descripción}</p>
                <p className="detallePrecio"><span>Precio: </span>${precio}</p>
            </div>
            <div className="conuter">
            { cantidadAgregada === 0 
                    ?  <Contador inicial={0} maximo={existencia} agregar={ agregar } />
                    :  <Link to='/carrito'>Terminar compra</Link>
                }
            
            </div>
        </div>
    )
}


export default ItemDetail