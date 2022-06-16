import "./Item.css"
import { Link } from 'react-router-dom'

const Item = ({id, tipo, marca, img, precio }) => {

    return(
    <div className="borderCard">
            <div className="titleCard">
                <h3 className="titulo">{marca} - {tipo}</h3>
                <div className="imgCard">
                    <img className="imagenProd" src={img} alt={`foto de una imagen de un queso ${tipo}`}/>
                </div>
                <p>Precio: <span>${ precio }</span> x/Kg</p>
                <Link to={`/detalle/${id}`}>Detalles</Link>
            </div>
    </div>

    )}

export default Item