import "./Item.css"
import Contador from "../Counter/Counter"


const Item = ({ tipo, marca, descripcion, precio, img }) => {
    return(
    <div className="borderCard">
        <div className="titleCard">
            <h3 className="titulo">{marca} - {tipo}</h3>
            <div className="imgCard">
                <img className="imagenProd" src={img} alt=""/>
            </div>
            <p className="descrCard">"{descripcion}"
            </p>
            <p>Precio: <span>${precio}</span></p>
            <Contador inicial={0} maximo={15} />
        </div>
    </div>

    )}

export default Item