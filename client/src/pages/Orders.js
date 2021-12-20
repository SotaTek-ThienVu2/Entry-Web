import React from "react";
import OrderComponent from "../components/OrderList";
import Modal from "../components/Modal";
import useModal from '../components/useModal';
const OrderPage = () => {
  const { isShowing, toggle } = useModal();
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
