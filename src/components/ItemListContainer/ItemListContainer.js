import "./ItemListContainer.css"

let mensaje = prompt("Decinos tu nombre")

const ItemListContainer =()=>{
return (
<div>
    <h2>Hola <span>{mensaje}</span> bienvenido a nuestra App! </h2>
</div>
)
}

export default ItemListContainer