import "./ItemListContainer.css"
import { useEffect, useState } from "react"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"

import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from "../../services/firebase"

const ItemListContainer =()=>{

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState (true)
    
    const { categoriaId } = useParams()


    useEffect(() => {
        setLoading(true)

        const collectionRef = categoriaId ? (
            query( collection(db, 'productos'), where('categoria', '==', categoriaId ) )
        ) : (collection(db, 'productos'))

        getDocs(collectionRef).then(res => {
            const productosFromatted = res.docs.map(doc =>{
                return { id: doc.id, ...doc.data() }
            })
            setProductos(productosFromatted)
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setLoading(false)
        })

    },[categoriaId])

    if(loading){
        return(
            <h1>cargando productos...</h1>
        )
    }
return (
<div>
    <div className="saludo">
        <h2>Tienda de productos</h2>
    </div>
    <div className="catalogo">
        <ItemList productos={ productos } />
    </div>
</div>
)
}

export default ItemListContainer