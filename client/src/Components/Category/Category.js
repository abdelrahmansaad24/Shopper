import React, { useContext, useEffect, useState } from "react";
import "./Category.css";
import axios from "axios";
import { Item } from "../Item/Item";

export const Category = ({ category, banner }) => {
  const [all_products, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [sortValue, setSortValue] = useState("");
  const [limit, setLimit] = useState(10);

  let [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    setLimit(10);
    axios
      .get(`http://localhost:8900/api/products/count?category=${category}`)
      .then((response) => {
        setCountProducts(response.data.count);
      });
    setLoading(true);
    setErrorMessage("");
    axios
      .get(
        `http://localhost:8900/api/products?category=${category}&sort=${sortValue}&limit=${10}`
      )
      .then((response) => {
        setAllProducts(response.data.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error while Loading products, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    axios
      .get(
        `http://localhost:8900/api/products?category=${category}&sort=${sortValue}&limit=${limit}`
      )
      .then((response) => {
        setAllProducts(response.data.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error while Loading products, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sortValue, limit]);

  return (
    <div className="category">
      <div className="container">
        <div className="category-header">
          <img src={banner} alt="banner" className="banner" />
        </div>
        <div className="middle">
          <p>
            <span>Showing 1 - {limit}</span> out of {countProducts} products
          </p>
          <div className="sort-by">
            Sort by{" "}
            <select
              className="custom-select"
              onChange={(e) => {
                console.log(e.target.value);
                setSortValue(e.target.value);
              }}>
              <option value="">All</option>
              <option value="new_price">Lowest price</option>
              <option value="-new_price">Highest price</option>
              <option value="crearedAt">Oldest</option>
              <option value="-crearedAt">Newest</option>
            </select>
          </div>
        </div>
        <div className="category-products">
          {loading ? (
            <p>Loading....</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            all_products &&
            all_products.map((product, index) => {
              if (product.category === category)
                return <Item product={product} key={index} />;
              else return null;
            })
          )}
        </div>
        <div className="catgory-bottom">
          <button
            className={limit === countProducts ? "disable-button" : ""}
            onClick={() =>
              countProducts < limit + 5
                ? setLimit(countProducts)
                : setLimit(limit + 5)
            }>
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};
