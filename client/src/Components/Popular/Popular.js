import React, { useEffect, useState } from "react";
import "./Popular.css";
import data_product from "../../Assets/data";
import { Item } from "../Item/Item";
import axios from "axios";

export const Popular = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    axios
      .get(`http://localhost:8900/api/products/popularInWomen`)
      .then((response) => {
        setProducts(response.data.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error while Loading products, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="popular">
      <div className="container">
        <div className="popular-header">
          <h2 className="popular-heading">popular in women</h2>
          <hr />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          products && (
            <div className="popular-items">
              {products.map((product) => {
                return <Item key={product.id} product={product} />;
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};
