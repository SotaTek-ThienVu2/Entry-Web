import React, { useEffect } from "react";
import { get } from '../api/ApiService'
import { useDispatch } from "react-redux";
import { setOrder } from "../redux/actions/ordersActions";
import OrderComponent from "./OrderComponent";
import Modal from "./Modal";
import useModal from './useModal';
const OrderPage = () => {
  const {isShowing, toggle} = useModal();
  const dispatch = useDispatch()
  const fetchOrders = async () => {
    const response = await get('orders')
    dispatch(setOrder(response));
  }

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, process.env.REACT_APP_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ui column container">
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
