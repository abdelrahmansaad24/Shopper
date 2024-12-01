import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import { useParams } from "react-router-dom";
import { productContext } from "../../Context/Context";
import axios from "axios";

const Order = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [order, setOrder] = useState();
  const { sizes_names, formatDate } = useContext(productContext);

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    axios
      .get(`http://localhost:8900/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
        },
      })
      .then((response) => {
        setOrder(response.data.data);
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
    <div className="order">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          order && (
            <>
              <div className="order-info">
                <p>Order: {order._id}</p>
                <div className="order-basic-info">
                  <p>ID: {order._id}</p>
                  <p>Ordered on: {formatDate(order.crearedAt)}</p>
                  <p>Total: ${order.total_price}</p>
                </div>
              </div>
              <div className="cart-details">
                <div className="cart-header cart-order">
                  <p>Products</p>
                  <p>Title</p>
                  <p>Size</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Total</p>
                </div>
                <hr />
                <div className="cart-items">
                  {loading ? (
                    <p>Loading...</p>
                  ) : errorMessage ? (
                    <p>errorMessage</p>
                  ) : (
                    order &&
                    Object.keys(order.products).map((key) => {
                      // key Id
                      const item = order.products[key].details;
                      const sizes = order.products[key];
                      delete sizes.details;
                      return Object.keys(sizes).map((size) => {
                        return (
                          <>
                            <div className="cart-item">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="product-image"
                              />
                              <p>{item.name}</p>
                              <p>{sizes_names.current[size]}</p>
                              <p>${item.new_price}</p>
                              <p className="quantity">{sizes[size]}</p>
                              <p>${sizes[size] * item.new_price}</p>
                            </div>
                            <hr />
                          </>
                        );
                      });
                    })
                  )}
                </div>
                <div className="cart-bottom">
                  <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div className="total">
                      <div className="Subtotal">
                        <p>Subtotal</p>
                        <p>${order && order.total_price}</p>
                      </div>
                      <hr />
                      <div className="Shopping-Fee">
                        <p>Shopping Fee</p>
                        <p>Free</p>
                      </div>
                      <hr />
                      <div className="total-price">
                        <p>Total</p>
                        <p>${order && order.total_price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Order;
