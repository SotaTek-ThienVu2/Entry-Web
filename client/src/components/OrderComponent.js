import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderComponent = () => {
  const orders = useSelector((state) => state.allOrders.orders);
  const renderList = orders.map((order) => {
    const { id, name, price, category, orderNumber, status } = order;
    return (
      <div className="four wide column" key={id}>
        
          <div className="ui link cards">
            <div className="card card-custom">
              <div className="content">
                <div className="card-header">
                  <div className="header">
                <Link to={`order/${id}`}>
                    {name}
                </Link>
                  <br />
                  <h6>#{orderNumber}</h6>
                  </div>
                  {(status === 'confirmed' || status === 'created') ? (
                  <div style={{'display': 'flex', 'flexDirection': 'column', 'alignItems': 'flex-end'}}>
                  <div className="badge">
                    {status}
                  </div>
                  <div className="ui vertical animated button" tabIndex="0">
                    <div className="visible content">Cancel</div>
                  </div>
                  </div>
                  ):
                  (
                    <div className="badge">
                    {status}
                  </div>
                  )}
                </div>
                <div className="meta price">$ {price}</div>
                <div className="meta">{category}</div>
              </div>
            </div>
          </div>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default OrderComponent;
