import "./ItemListContainer.css"
import { useEffect, useState } from "react"
import { getProductos, getProductosByCategoria } from "../../productos.js"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"

const ItemListContainer =()=>{

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState (true)
    
    const { categoriaId } = useParams()


    useEffect(() => {
        setLoading(true)

        if(!categoriaId){
        getProductos().then( res => {
            setProductos(res)
        }).finally(() => {
            setLoading(false)
        })
        }else{
            getProductosByCategoria(categoriaId).then( res => {
                setProductos(res)
            }).finally(() => {
                setLoading(false)
            })
        }
    },[categoriaId])

    if(loading){
        return(
            <h1>cargando productos...</h1>
        )
    }
return (
<div>
    <div className="saludo">
        <h2>Hola bienvenido a nuestra App! </h2>
    </div>
    <div className="catalogo">
        <ItemList productos={ productos } />
    </div>
</div>
)
}

export default ItemListContainer