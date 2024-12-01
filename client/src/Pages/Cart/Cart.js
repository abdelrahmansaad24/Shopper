import React, { useContext, useRef } from "react";
import "./Cart.css";
import { productContext } from "../../Context/Context";
import remove_icon from "../../Assets/cart_cross_icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Cart = () => {
  const {
    cartItems,
    getTotalPrice,
    removeFromCart,
    cartProducts,
    sizes_names,
    clearCart,
  } = useContext(productContext);

  const navigate = useNavigate();

  const createOrder = () => {
    axios
      .post(
        "http://localhost:8900/api/orders",
        {
          products: {
            ...cartItems,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
        }
      )
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (response.status == 201 && response.data.status === "success") {
          clearCart();
          toast("product created successfully");
          navigate(`/orderConfirm/${response.data.data.order._id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-details">
          <div className="cart-header">
            <p>Products</p>
            <p>Title</p>
            <p>Size</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          <div className="cart-items">
            {Object.keys(cartItems).map((key) => {
              const item = cartProducts[key];
              return Object.keys(cartItems[key]).map((size) => {
                if (cartItems[key][size] === 0) return null;
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
                      <p className="quantity">{cartItems[key][size]}</p>
                      <p>${cartItems[key][size] * item.new_price}</p>
                      <img
                        src={remove_icon}
                        alt="remove"
                        className="remove-image"
                        onClick={() => removeFromCart(item._id, size)}
                      />
                    </div>
                    <hr />
                  </>
                );
              });
            })}
          </div>
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="total">
              <div className="Subtotal">
                <p>Subtotal</p>
                <p>${getTotalPrice()}</p>
              </div>
              <hr />
              <div className="Shopping-Fee">
                <p>Shopping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="total-price">
                <p>Total</p>
                <p>${getTotalPrice()}</p>
              </div>
            </div>
            {Object.keys(cartItems).length > 0 && (
              <button className="to-checkout" onClick={() => createOrder()}>
                Create Order
              </button>
            )}
          </div>
          <div className="promocode-section">
            <p className="promo-parag">
              If you have a promo code, Enter it here
            </p>
            <div className="promocode">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
