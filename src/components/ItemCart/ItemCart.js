import { useContext } from "react";
import CartContext from "../../context/cartContext";
import "./ItemCart.css";

const ItemCart = ({id, tipo, marca, img, precio, cantidad }) => {
    const subtotal = precio * cantidad;

    const { quitarItem } = useContext(CartContext);

    const deleteItem = () => {
        quitarItem(id);
    }

    return(
    <div className="detalleItemCart">
        <>
        <img className="imagenProdCart" src={img} alt={`foto de una imagen de un queso ${tipo}`}/>
        </>
        <div><span>Producto: </span>{ marca } - Tipo { tipo }</div>
        <div><span>Precio xKg: </span>${ precio }</div>
        <div><span>Cantidad: </span>{ cantidad }</div>
        <div><span>Subtotal: </span>${ subtotal }</div>
        <> <button onClick={deleteItem}>Eliminar</button></>     
    </div>

    )}

export default ItemCart