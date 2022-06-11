import { useState, useEffect } from 'react'
import './ItemDetailContainer.css'
import { getProductoById } from '../../productos'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'

const ItemDetailContainer = () =>{

    const [producto, setProducto] = useState()

    const { productoId } = useParams()

    useEffect(() => {
        getProductoById(productoId).then(res => {
            setProducto(res)
        })
    },[])

return (
    <>
    <h1 className='tituloDetalle'>Detalle del producto</h1>
    <ItemDetail {...producto} />
    </>
)

}

export default ItemDetailContainer
