import "./ItemDetail.css"
import Contador from "../Counter/Counter"

const ItemDetail = ({ id, tipo, descripcion, precio, img, marca }) => {
    return (
        <div className="container">
            <div className="img">
            <img className="detalleImg" src={`.${img}`} alt={`foto de una imagen de un queso ${tipo}`}/>
            </div>
            <div className="descrip">
                <p className="detalleSub"><spam>Marca: </spam>{marca}</p>
                <p className="detalleSub"><spam>Tipo: </spam>{tipo}</p>
                <p className="detalleDesc"><spam>Descripción: </spam>{descripcion}</p>
                <p className="detallePrecio"><spam>Precio: </spam>${precio}</p>
            </div>
            <div className="conuter">
            <Contador inicial={0} maximo={12} />
            </div>
        </div>
    )
}


export default ItemDetail