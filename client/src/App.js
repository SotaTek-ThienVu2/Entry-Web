import React, {useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderListing from "./pages/Orders";
import Header from "./components/Header";
import "./assets/css/App.css";
import OrderDetails from "./components/OrderDetails";
import { useDispatch } from "react-redux";
import { setOrder } from "./redux/actions/ordersActions";
import { get } from './api/ApiService'
function App() {
  const dispatch = useDispatch()
  const fetchOrders = async () => {
    const response = await get('orders')
    dispatch(setOrder(response));
  }
  useEffect(() => {
    fetchOrders();
    const reloadOrderList = setInterval(() => {
      fetchOrders();
    }, process.env.REACT_APP_INTERVAL);
    return () => clearInterval(reloadOrderList);
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={OrderListing} />
          <Route path="/order/:id"  component={OrderDetails} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
