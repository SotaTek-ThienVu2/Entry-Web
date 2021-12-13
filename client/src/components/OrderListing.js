import React from "react";
import OrderComponent from "./OrderComponent";
import Modal from "./Modal";
import useModal from './useModal';
const OrderPage = () => {
  const {isShowing, toggle} = useModal();
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
