import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminModule from './components/Administrator/Administrator';
import CartContainer from './components/CartContainer/CartContainer';
import { CartProvider } from './context/cartContext';
import Checkout from './components/Checkout/Checkout';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import React from 'react';
import Register from './components/Register/Register';
import StockProductos from './components/Stock/Stock';

function App() {
	return (
		<div className='App'>
			<CartProvider>
				<BrowserRouter>
					<NavBar />
					<Routes>
						<Route path='/admin' element={<StockProductos />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/' element={<ItemListContainer />} />
						<Route
							path='/detalle/:productoId'
							element={<ItemDetailContainer />}
						/>
						<Route
							path='/categoria/:categoriaId'
							element={<ItemListContainer />}
						/>
						<Route path='/carrito' element={<CartContainer />} />
						<Route path='/checkout' element={<Checkout />} />
					</Routes>
				</BrowserRouter>
			</CartProvider>
		</div>
	);
}

export default App;
