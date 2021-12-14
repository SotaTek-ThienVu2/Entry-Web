import React, { useEffect } from "react"
import ConstantsList from '../common/Constant'
import { get, put } from '../api/ApiService'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectedOrder, removeSelectedOrder , setOrderHistory} from "../redux/actions/ordersActions"
import { useHistory } from "react-router"
const OrderDetails = () => {
  const { id } = useParams();
  let order = useSelector((state) => state.order);
  let orderHistory = useSelector((state) => state.orderHistory);
  const history = useHistory();
  const { image, name, price, category, description, orderNumber, address, status, quantity } = order;
  const dispatch = useDispatch();
  const formatDate = (dateString) => {
    const options = {  year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  const fetchOrderDetail = async (id) => {
    const response = await get(`orders/${id}`)
      dispatch(selectedOrder(response));
  };
  const onCancel = async () => {
    const response = await put(`orders/${id}/cancel`)
      if (response === 1) {
        fetchOrderDetail(id);
      }else{
        fetchOrderDetail(id);
        alert(ConstantsList.ERROR)
      }
  };
  useEffect(() => {
    if (id && id !== "") {
      fetchOrderDetail(id);
    }
    return () => {
      dispatch(removeSelectedOrder());
    };
  }, [id]);

  useEffect(() => {
    if (orderNumber) {
      const fetchOrderDetailHistory = async (orderNumber) => {
        const response = await get(`orders/${orderNumber}/detail`);
          dispatch(setOrderHistory(response));
      };
      fetchOrderDetailHistory(orderNumber);
    }
  }, [orderNumber]);

  const renderList = orderHistory?.orderHistory?.map((history) => {
    const { id, status, createTimestamp } = history;
    return (
        <li className="li-custom" key={id}>
          <span className="content-custom"> 
            {status}
          </span> at {formatDate(createTimestamp)}</li>
    )
  });

  return (
    <div className="ui column container">
      {Object.keys(order).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
          <button onClick={()=>history.replace('/')}>HOME</button>
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp order-detail-custom">
                <h5>#{orderNumber}</h5>
                <h1>{name}</h1>
                <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-between'}}>
                <a className="ui teal tag label">${price}</a>
                <div style={{'fontSize': '20px'}}>
                  <strong>Quantity: </strong><a>{quantity}</a>
                </div>
                </div>
                <h3 className="ui brown block header">Category: {category}</h3>
                <p><strong>Description: </strong>{description}</p>
                <p><strong>Address:</strong> {address}</p>
                <ul style={{'marginBottom': '30px', 'lineHeight': '2rem'}}>
                  {renderList}
                </ul>
                {(status === 'confirmed' || status === 'created') ? 
                <div className="ui vertical animated button" tabIndex="0" onClick={onCancel}>
                  <div className="visible content">Cancel</div>
                </div>: 
                <div style={{'cursor': 'not-allowed'}} className="ui vertical button " tabIndex="0">
                  <div className="content-custom content">{status}</div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
