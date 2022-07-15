
# E-Commerce (J&B Quesos)

E-Commerce de productos (en este ejemplo, alimentos lácteos como quesos y dulce de leche).

La idea es crear un sitio versatil que se acomode a los productos que sean necesario vender.

A futuro la idea es mejorar el proyeecto, incluyendo una sección de administrador para el mantenimiento del stock.

Hoy la aplicación recibe los productos de Firestore y los gestiona en la tienda. Dando la posibilidad al visitante de recorrer los productos por categorías y realizar un pedido.

La aplicación controla el stock al momento de confrimar la compra y en el instante de renderizar la tienda, no mostrando los productos con stock = 0.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Example in .evn.example

 `REACT_APP_apiKey=`
 `REACT_APP_authDomain=`
 `REACT_APP_projectId=`
 `REACT_APP_storageBucket=`
 `REACT_APP_messagingSenderId=`
 `REACT_APP_appId=`


## Run Locally

Clone the project

```bash
  git clone https://github.com/leacau/React_jybquesos_Chena/tree/entrega_final
```

Go to the project directory

```bash
  cd jybquesos
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Video demosración

https://github.com/leacau/React_jybquesos_Chena/blob/entrega_final/src/app_gif/funcionando.gif



## Deployment

Puede probarse el sitio corriendo en

https://react-chena-jybquesos.netlify.app



## Herramientas y librerias utilizadas

#Firebase (Firestore)

Utilizado para el manejo de la base de datos, llamadas de productos, modificiación de stocks y guardado de ordenes de clientes.

#React Router Dom

Utilizado para lograr enrutamientos correctos y prolijos, con el objetivo de tener una navegación satisfactoria por la aplicación.

#Sweet Alert 2

Plugin que utilicé para lograr mensajes al ususario que sean atractivos, pero sin requerir demasiado desarrollo o instalaciones complicadas.

#Bootstrap

Con este Framework logré tener un acabado más prolijo en los botones, y en los container del carrito y del checkout.
