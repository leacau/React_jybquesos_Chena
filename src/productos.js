const quesos = [
    {   marca: 'DON_ANGEL',
        tipo: 'BURGER',
        precio: 324,
        descripcion: 'Al estilo del clásico queso Cheddar inglés, con su característico color intenso, su textura ideal para gratinar en hamburguesas y otros sandwiches.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/BURGER.jpg',
        id: 'DON_ANGEL_BURGER'
    },
    {
        marca: 'DON_ANGEL',
        tipo: 'ARABE',
        precio: 1234,
        descripcion: 'Un queso diferente de creación propia, inspirado en los sabores que trajeron a Argentina los inmigrantes árabes. El anís y el orégano le aportan el aroma y sabor característicos de esas tierras.',
        cantidad: 3,
        img: './img/quesos/DON_ANGEL/ARABE.jpg',
        id: 'DON_ANGEL_ARABE'
    },
    {
        marca: 'DON_ANGEL',
        tipo: 'CANESTRATO',
        precio: 4312,
        descripcion: 'Inspirado en recetas italianas. Dejamos madurar estos quesos en pequeñas canastas de juncos, de las cuales obtienen su particular forma.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/CANESTRATO.jpg',
        id: 'DON_ANGEL_CANESTRATO'
    },
    {
        marca: 'DON_ANGEL',
        tipo: 'AZUL',
        precio: 3223,
        descripcion: 'Queso que se obtiene por maduración de la cuajada de la leche una vez eliminado el suero. De sabor fuerte y aromatico.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/AZUL.jpg',
        id: 'DON_ANGEL_AZUL'
    },
    {
        marca: 'DON_ANGEL',
        tipo: 'MORBIER',
        precio: 3423,
        descripcion: 'Queso tradicional de Francia que se caracteriza por su exquisitez y por la fina capa de cenizas que separa horizontalmente a la pasta.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/MORBIER.jpg',
        id: 'DON_ANGEL_MORBIER'
    },
    {
        marca: 'DON_ANGEL',
        tipo: 'MARMOLADO',
        precio: 1234,
        descripcion: 'En este intervienen dos tipos de quesos semiduros incluso con distintos sabores, predominando el rojizo conferido por el pimentón ahumado.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/MARMOLADO.jpg',
        id: 'DON_ANGEL_MARMOLADO'
    },
    {
        marca: 'DON_ANGEL',
        tipo: 'TYBO',
        precio: 4342,
        descripcion: 'Es el queso ideal para el feteado en maquinas y acompañante ideal en sándwichs.',
        cantidad: 2,
        img: './img/quesos/DON_ANGEL/TYBO.jpg',
        id: 'DON_ANGEL_TYBO'
    },
    {
        marca: 'DON_ANGEL',
        tipo: 'SARDO',
        precio: 314,
        descripcion: 'Su sabor y su textura son lo que cierran con broche de oro la exquisitez en tus pastas.',
        cantidad: 3,
        img: './img/quesos/DON_ANGEL/SARDO.jpg',
        id: 'DON_ANGEL_SARDO'
    },
    {
        marca: 'DON_ANGEL',
        tipo: 'FONTINA',
        precio: 523,
        descripcion: 'Queso graso de humedad intermedia que se obtiene por coagulación de la leche por medio del cuajo y/u otras enzimas coagulantes apropiadas',
        cantidad: 4,
        img: './img/quesos/DON_ANGEL/FONTINA.jpg',
        id: 'DON_ANGEL_FONTINA'
    }

]

export const getQuesos = () => {
    return new Promise ((res, rej) => {
        setTimeout(() =>{
            res(quesos)
        }, 2000)
    })
}