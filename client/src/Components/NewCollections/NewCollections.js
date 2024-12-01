import React, { useEffect, useState } from "react";
import "./NewCollections.css";

import new_collections from "../../Assets/new_collections";
import { Item } from "../Item/Item";
import axios from "axios";

export const NewCollections = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    axios
      .get(`http://localhost:8900/api/products/latestCollection?limit=8`)
      .then((response) => {
        setProducts(response.data.data.products);
        console.log(response);
        console.log(response.data.data.products);
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
    <div className="new-collections">
      <div className="container">
        <div className="new-collections-header">
          <h2>New Collections</h2>
          <hr />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          products && (
            <div className="new-collections-items">
              {products.map((product, i) => {
                return <Item product={product} key={i} />;
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};
