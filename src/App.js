import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Item from './components/Item/Item';

function App() {
  return (
    <div className="App">
        <NavBar />
        <ItemListContainer />
    </div>
  );
}

export default App;
