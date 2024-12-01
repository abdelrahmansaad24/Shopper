import React from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginSignUp } from "./Pages/LoginSignUp/LoginSignUp";
import { Shop } from "./Pages/Shop/Shop";
import { Footer } from "./Components/Footer/Footer";
import { Category } from "./Components/Category/Category";
import banner_mens from "./Assets/banner_mens.png";
import banner_women from "./Assets/banner_women.png";
import banner_kids from "./Assets/banner_kids.png";
import Context from "./Context/Context";
import { Product } from "./Pages/Product/Product";
import { Cart } from "./Pages/Cart/Cart";
import { ToastContainer } from "react-toastify";
import { LatestCollection } from "./Pages/LatestCollection/LatestCollection";
import Profile from "./Pages/Profile/Profile";
import Order from "./Pages/Order/Order";
import OrderConfirm from "./Pages/OrderConfirm/OrderConfirm";
import ReviewCard from "./Components/ReviewCard/ReviewCard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Context>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/login" element={<LoginSignUp />} />
              <Route
                path="/men"
                element={<Category category="men" banner={banner_mens} />}
              />
              <Route
                path="/women"
                element={<Category category="women" banner={banner_women} />}
              />
              <Route
                path="/kids"
                element={<Category category="kid" banner={banner_kids} />}
              />
              <Route path="product/:productId" element={<Product />}></Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/latestCollection" element={<LatestCollection />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order/:orderId" element={<Order />} />
              <Route path="/orderConfirm/:orderId" element={<OrderConfirm />} />
            </Routes>
            <Footer />
          </div>
        </Context>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
