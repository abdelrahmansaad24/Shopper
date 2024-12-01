import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { productContext } from "../../Context/Context";

const Orders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [orders, setOrders] = useState();

  const { formatDate } = useContext(productContext);

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    axios
      .get(`http://localhost:8900/api/orders/myOrders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
        },
      })
      .then((response) => {
        setOrders(response.data.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error while Loading your orders, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="orders-container">
      <h3 className="orders-header">My Orders</h3>
      <div className="orders-content">
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          orders &&
          orders.map((order) => {
            return (
              <>
                <div className="my-order">
                  <div className="order-left">
                    <p>Order Id: {order._id}</p>
                    <p>Total: ${order.total_price}</p>
                    <p>Ordered on: {formatDate(order.crearedAt)}</p>
                  </div>
                  <div className="order-right">
                    <button
                      className="view-order"
                      onClick={() => navigate(`/order/${order._id}`)}>
                      View Order
                    </button>
                  </div>
                </div>
                <hr />
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
