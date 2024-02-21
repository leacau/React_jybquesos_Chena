import './Counter.css';

import React, { useState } from 'react';

const Contador = ({ inicial, maximo, agregar }) => {
	const [cuenta, setCuenta] = useState(inicial);

	const resta = () => {
		cuenta > 0 && setCuenta((prev) => prev - 1);
	};

	const suma = () => {
		cuenta < maximo && setCuenta(cuenta + 1);
	};

	return (
		<div className='contador'>
			<div className='botonesContar'>
				<button className='btnSumRest mx-2' onClick={resta}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='30'
						height='30'
						fill='currentColor'
						className='bi bi-dash-circle'
						viewBox='0 0 16 16'
					>
						<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
						<path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z' />
					</svg>
				</button>
				<h2 className='cuenta'>{cuenta}</h2>
				<button className='btnSumRest mx-2' onClick={suma}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='30'
						height='30'
						fill='currentColor'
						className='bi bi-plus-circle'
						viewBox='0 0 16 16'
					>
						<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
						<path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
					</svg>
				</button>
			</div>
			<div>
				<button
					className={
						cuenta > 0 ? 'btn btn-secondary mx-3 my-2' : 'visually-hidden'
					}
					onClick={() => agregar(cuenta)}
				>
					Agregar carrito
				</button>
			</div>
		</div>
	);
};

export default Contador;
