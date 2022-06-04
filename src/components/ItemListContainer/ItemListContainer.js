import "./ItemListContainer.css"
import { useEffect, useState } from "react"
import { getQuesos } from "../../productos.js"
import ItemList from "../ItemList/ItemList"

let mensaje = prompt("Decinos tu nombre")

const ItemListContainer =()=>{

    const [quesos, setQuesos] = useState([])

    useEffect(() => {
        getQuesos().then( res => {
            setQuesos(res)
        })

    },[])

return (
<div>
    <div className="saludo">
        <h2>Hola <span>{mensaje}</span> bienvenido a nuestra App! </h2>
    </div>
    <div className="catalogo">
        <ItemList productos={ quesos } />
    </div>
</div>
)
}

export default ItemListContainer