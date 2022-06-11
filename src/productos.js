const productos = [
    {   marca: 'Don Angel',
        tipo: 'Burguer',
        precio: 324,
        descripcion: 'Al estilo del clásico queso Cheddar inglés, con su característico color intenso, su textura ideal para gratinar en hamburguesas y otros sandwiches.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/BURGER.jpg',
        categoria: 'quesos',
        id: 'DON_ANGEL_BURGER'
    },
    {
        marca: 'Don Angel',
        tipo: 'Arabe',
        precio: 1234,
        descripcion: 'Un queso diferente de creación propia, inspirado en los sabores que trajeron a Argentina los inmigrantes árabes. El anís y el orégano le aportan el aroma y sabor característicos de esas tierras.',
        cantidad: 3,
        img: './img/quesos/DON_ANGEL/ARABE.jpg',
        categoria: 'quesos',
        id: 'DON_ANGEL_ARABE'
    },
    {
        marca: 'Don Angel',
        tipo: 'Canestrato',
        precio: 4312,
        descripcion: 'Inspirado en recetas italianas. Dejamos madurar estos quesos en pequeñas canastas de juncos, de las cuales obtienen su particular forma.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/CANESTRATO.jpg',
        categoria: 'quesos',
        id: 'DON_ANGEL_CANESTRATO'
    },
    {
        marca: 'Don Angel',
        tipo: 'Azul',
        precio: 3223,
        descripcion: 'Queso que se obtiene por maduración de la cuajada de la leche una vez eliminado el suero. De sabor fuerte y aromatico.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/AZUL.jpg',
        categoria: 'quesos',
        id: 'DON_ANGEL_AZUL'
    },
    {
        marca: 'Don Angel',
        tipo: 'Morbier',
        precio: 3423,
        descripcion: 'Queso tradicional de Francia que se caracteriza por su exquisitez y por la fina capa de cenizas que separa horizontalmente a la pasta.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/MORBIER.jpg',
        categoria: 'quesos',
        id: 'DON_ANGEL_MORBIER'
    },
    {
        marca: 'Don Angel',
        tipo: 'Marmolado',
        precio: 1234,
        descripcion: 'En este intervienen dos tipos de quesos semiduros incluso con distintos sabores, predominando el rojizo conferido por el pimentón ahumado.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/MARMOLADO.jpg',
        categoria: 'quesos',
        id: 'DON_ANGEL_MARMOLADO'
    },
    {
        marca: 'Don Angel',
        tipo: 'Tybo',
        precio: 4342,
        descripcion: 'Es el queso ideal para el feteado en maquinas y acompañante ideal en sándwichs.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/TYBO.jpg',
        categoria: 'quesos',
        id: 'DON_ANGEL_TYBO'
    },
    {
        marca: 'Don Angel',
        tipo: 'Sardo',
        precio: 314,
        descripcion: 'Su sabor y su textura son lo que cierran con broche de oro la exquisitez en tus pastas.',
        cantidad: 3,
        img: './img/quesos/DON_ANGEL/SARDO.jpg',
        categoria: 'quesos',
        id: 'DON_ANGEL_SARDO'
    },
    {
        marca: 'Don Angel',
        tipo: 'Fontina',
        precio: 523,
        descripcion: 'Queso graso de humedad intermedia que se obtiene por coagulación de la leche por medio del cuajo y/u otras enzimas coagulantes apropiadas',
        cantidad: 4,
        img: './img/quesos/DON_ANGEL/FONTINA.jpg',
        categoria: 'quesos',
        id: 'DON_ANGEL_FONTINA'
    },
    {
        marca: 'Don Angel',
        tipo: 'Dulce de Leche Repostero 1kg',
        precio: 620,
        descripcion: 'Elaborado con la receta tradicional del dulce de leche repostero, posee una consistencia firme, untuosa y sostenida, con aspecto mate y poco brillo. Es un producto Fuente de Calcio.',
        cantidad: 14,
        img: './img/quesos/DON_ANGEL/DDL_REPOSTERO_1KG.jpg',
        categoria: 'otros',
        id: 'DON_ANGEL_DDL_RESPOSTERO_1KG'
    },
    {
        marca: 'Don Angel',
        tipo: 'Dulce de Leche Repostero 500Grs',
        precio: 380,
        descripcion: 'Elaborado con la receta tradicional del dulce de leche repostero, posee una consistencia firme, untuosa y sostenida, con aspecto mate y poco brillo. Es un producto Fuente de Calcio.',
        cantidad: 12,
        img: './img/quesos/DON_ANGEL/DDL_REPOSTERO_500GR.jpg',
        categoria: 'otros',
        id: 'DON_ANGEL_DDL_RESPOSTERO_500GR'
    },
    {
        marca: 'Don Angel',
        tipo: 'Dulce de Leche Familiar 1kg',
        precio: 620,
        descripcion: 'Elaborado con una mayor proporción de azúcar y menos leche que el Dulce de Leche Colonial, se caracteriza por tener un color más claro, cuerpo cremoso y sabor suave.',
        cantidad: 14,
        img: './img/quesos/DON_ANGEL/DDL_FAMILIAR_1KG.jpg',
        categoria: 'otros',
        id: 'DON_ANGEL_DDL_FAMILIAR_1KG'
    },
    {
        marca: 'Don Angel',
        tipo: 'Dulce de Leche Familiar 500Grs',
        precio: 380,
        descripcion: 'Elaborado con una mayor proporción de azúcar y menos leche que el Dulce de Leche Colonial, se caracteriza por tener un color más claro, cuerpo cremoso y sabor suave.',
        cantidad: 12,
        img: './img/quesos/DON_ANGEL/DDL_FAMILIAR_500GR.jpg',
        categoria: 'otros',
        id: 'DON_ANGEL_DDL_FAMILIAR_500GR'
    },
]

export const getProductos = () => {
    return new Promise ((res, rej) => {
        setTimeout(() =>{
            res(productos)
        }, 500)
    })
}

export const getProductosByCategoria = (categoriaId) => {
    return new Promise ((res, rej) => {
        setTimeout(() =>{
            res(productos.filter(prod => prod.categoria === categoriaId))
        }, 500)
    })
}

export const getProductoById = (id) => {
    return new Promise ((res, rej) => {
        setTimeout(() =>{
            res(productos.find(producto => producto.id === id))
        }, 500)
    })

}