import React, { useContext } from "react";
import "./OrderConfirm.css";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../../Context/Context";

const OrderConfirm = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { setActiveTap } = useContext(productContext);
  return (
    <div className="order-confirm">
      <div className="container">
        <h1>Thank you for your order!</h1>
        <p>
          Your order has been confirmed. You will receive an email confirmation.
          Your order id is 1
        </p>
        <div className="order-confirm-buttons">
          <button
            onClick={() => {
              navigate(`/order/${orderId}`);
            }}>
            View Order
          </button>
          <button
            onClick={() => {
              setActiveTap("myOrders");
              navigate("/profile");
            }}>
            View all orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
