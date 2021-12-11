import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedOrder,
  removeSelectedOrder,
} from "../redux/actions/ordersActions";
const OrderDetails = () => {
  const { id } = useParams();
  let order = useSelector((state) => state.order);
  const { image, name, price, category, description, orderNumber,address, status } = order;
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOrderDetail = async (id) => {
    const response = await axios
      .get(`http://localhost:3000/orders/${id}`)
      .catch((err) => {});
    dispatch(selectedOrder(response?.data));
  };

  useEffect(() => {
    if (id && id !== "") fetchOrderDetail(id);
    return () => {
      dispatch(removeSelectedOrder());
    };
  }, [id]);
  return (
    <div className="ui column container">
      {Object.keys(order).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{name}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="visible content">Cancel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
