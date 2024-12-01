import React from "react";
import "./RelatedProducts.css";
import data_product from "../../Assets/data";
import { Item } from "../Item/Item";

export const RelatedProducts = () => {
  return (
    <div className="related-products">
      <div className="related-products-header">
        <h2>Related Products</h2>
        <hr />
      </div>
      <div className="related-products-items">
        {data_product.map((product, index) => {
          return <Item product={product} key={index} />;
        })}
      </div>
    </div>
  );
};
