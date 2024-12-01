import React, { createContext, useRef, useState } from "react";
import all_products from "../Assets/all_product";
import { format } from "date-fns";

export const productContext = createContext();

const ContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartProducts, setCartProducts] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [activeTap, setActiveTap] = useState("personalInfo");
  const [showReviewCard, setshowReviewCard] = useState(false);

  const sizes_names = useRef({
    large_quantity: "L",
    x_large_quantity: "XL",
    xx_large_quantity: "XXL",
    small_quantity: "S",
    medium_quantity: "M",
  });

  const addToCart = (product, itemSize) => {
    const itemId = product._id;
    if (!cartItems[itemId]) {
      setCartProducts({ ...cartProducts, [itemId]: product });
      setCartItems({ ...cartItems, [itemId]: { [itemSize]: 1 } });
    } else {
      if (!cartItems[itemId][itemSize]) {
        const obj = {
          ...cartItems,
          [itemId]: { ...cartItems[itemId], [itemSize]: 1 },
        };
        setCartItems(obj);
      } else {
        const obj = {
          ...cartItems,
          [itemId]: {
            ...cartItems[itemId],
            [itemSize]: cartItems[itemId][itemSize] + 1,
          },
        };
        setCartItems(obj);
      }
    }
    setCartItemsCount(cartItemsCount + 1);
  };

  const getCartItemCount = (itemId, itemSize) => {
    if (!cartItems[itemId]) return 0;
    return !cartItems[itemId][itemSize] ? 0 : cartItems[itemId][itemSize];
  };

  const removeFromCart = (itemId, product_sizs) => {
    if (cartItems[itemId] && cartItems[itemId][product_sizs] > 0) {
      let obj = { ...cartItems };
      const item = obj[itemId];
      if (item[product_sizs] == 1) {
        if (Object.keys(item).length == 1) {
          delete obj[itemId];
          setCartItems({ ...obj });
        } else {
          delete item[product_sizs];
          setCartItems({ ...obj, [itemId]: { ...item } });
        }
      } else {
        setCartItems({
          ...cartItems,
          [itemId]: {
            ...cartItems[itemId],
            [product_sizs]: cartItems[itemId][product_sizs] - 1,
          },
        });
      }
      setCartItemsCount(cartItemsCount - 1);
    }
  };

  const getTotalPrice = () => {
    let price = 0;
    Object.keys(cartItems).forEach((itemId) => {
      const sizes = cartItems[itemId];
      let count = 0;
      Object.keys(sizes).forEach((size) => {
        count += cartItems[itemId][size];
      });
      price += count * cartProducts[itemId].new_price;
    });
    return price;
  };

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), "MM/dd/yyyy hh:mm:ss a");
  };

  const clearCart = () => {
    setCartItems({});
    setCartItemsCount(0);
  };

  const context_value = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    cartItemsCount,
    getTotalPrice,
    cartProducts,
    setLoggedIn,
    isLoggedIn,
    getCartItemCount,
    sizes_names,
    formatDate,
    clearCart,
    activeTap,
    setActiveTap,
    showReviewCard,
    setshowReviewCard,
  };
  return (
    <productContext.Provider value={context_value}>
      {props.children}
    </productContext.Provider>
  );
};

export default ContextProvider;
