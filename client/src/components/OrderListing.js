import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../redux/actions/ordersActions";
import OrderComponent from "./OrderComponent";
import Modal from "./Modal";
import useModal from './useModal';
const OrderPage = () => {
  const orders = useSelector((state) => state.allOrders.orders);
  const {isShowing, toggle} = useModal();
  const dispatch = useDispatch();
  const fetchOrders = async () => {
    const response = await axios
      .get("http://localhost:3000/orders")
      .catch((err) => {});
    dispatch(setOrder(response.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="ui column container">
      <input type="search" name="search" id="search" className="input-seach" placeholder="Search name of order..."/>
      <div className="ui vertical animated button" tabIndex="0" onClick={toggle}>
        <div className="hidden content">
          <i className="shop icon"></i>
        </div>
        <div className="visible content" >Add New Order</div>
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      />
      <OrderComponent />
    </div>
  );
};

export default OrderPage;
