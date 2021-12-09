
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <div className="header">
          <div className='header-container'>
            <img src="sotatek.png" alt="sotatek" className='header-logo' />
            <input type="search" name="search" id="search" className='input-search' placeholder='Search your order'/>
          </div>
        </div>
        <div className="container">
          <div className="main general-action">
          <button className='button-action refresh-btn'>Refresh</button>
          <button className='button-action create-btn'>Create New Order</button>
          </div>
        </div>
        <div className='container'>
          <div className="main">
            <Cart />
          </div>
        </div>
      </div>
    </Provider>   
  );
}
export default App;
