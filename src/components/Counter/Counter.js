import { useState } from 'react'
import './Counter.css'

const Contador = ({inicial, maximo, agregar}) => {
    const [cuenta, setCuenta] = useState(inicial)

    const resta = () => {
        cuenta > 0 && setCuenta(prev => prev - 1)
    }

    const suma = () => {
        cuenta < maximo && setCuenta(cuenta + 1)
    }

    return(
        <div className='contador'>
            <button className='boton' onClick={resta}>-</button>
            <h2 className='cuenta'>{cuenta}</h2>
            <button className='boton' onClick={suma}>+</button>
            <div>
            <button className="agregarCarrito" onClick={ () => agregar(cuenta)}>Agregar carrito</button>
            </div>
        </div>
    )
}


export default Contador