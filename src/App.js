import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import CartContainer from './components/CartContainer/CartContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import { CartProvider } from './context/cartContext';
import Checkout from './components/Checkout/Checkout';



function App() {
  return (  
    <div className="App">
      <CartProvider>
        <BrowserRouter> 
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />   
            <Route path='/detalle/:productoId' element={ <ItemDetailContainer /> } />
            <Route path='/categoria/:categoriaId' element={<ItemListContainer />} />
            <Route path='/carrito' element={<CartContainer />} />
            <Route path='/checkout' element={<Checkout />} />
           </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
