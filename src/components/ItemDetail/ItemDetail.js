import "./ItemDetail.css"
import Contador from "../Counter/Counter"
import { useContext, useState } from "react"
import CartContext from "../../context/cartContext"
import { Link } from 'react-router-dom'

const ItemDetail = ({ id, tipo, descripción, precio, img, marca, existencia }) => {
    
    const { addItem } = useContext( CartContext )
    const [cantidadAgregada, setCantidadAgregada] = useState(0)

    const agregar = (cantidad) => {
        addItem({id, marca, tipo, precio, cantidad, img})
        setCantidadAgregada(cantidad)
    }

    return (
        <div className="itemDetail">
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
                <div className="counter">
                { cantidadAgregada === 0 
                        ?  <Contador inicial={0} maximo={existencia} agregar={ agregar } />
                        :  (
                        <div>
                            <Link to='/carrito'><button className="btn btn-success m-2">Terminar compra</button></Link>
                            <br></br>
                            <Link to={-1}><button className="btn btn-secondary m-2">Continuar comprando</button></Link>
                        </div>
                        )
                    }
                
                </div>
            </div>
        </div>
    )
}


export default ItemDetail