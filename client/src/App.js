
import './App.css';
import Products from './components/Products/Products';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <Products></Products>
      </div>
    </Provider>
    
  );
}

export default App;
