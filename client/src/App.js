import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderListing from "./components/OrderListing";
import Header from "./components/Header";
import "./App.css";
import OrderDetails from "./components/OrderDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/home" exact component={OrderListing} />
          <Route path="/order/:id"  component={OrderDetails} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
