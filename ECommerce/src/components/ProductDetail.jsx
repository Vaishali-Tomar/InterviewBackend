import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "./Data";
import Products from "./Products";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([])

  useEffect(() => {
    const filterProduct = items.filter((product) => product.id == id);
    // console.log(filterProduct);
    setProduct(filterProduct[0]);

    const filterCategory = items.filter((p) => p.category === product.category);
    setRelatedProduct(filterCategory)
    // console.log("related",filterCategory);
  }, [id, product.category]);
  return (
    <>
    <div className="containter con">
      <div className="img">
        <img src={product.imgSrc} alt="" />
      </div>
      <div className="text-center">
        <h1 className="card-title">{product.title}</h1>
        <p className="card-text">{product.description}</p>
        <button className="btn btn-primary mx-3">{product.price}</button>
        <button className="btn btn-warning">Add to Cart</button>
      </div>

    </div>
    <h1 className="text-center">Related Products</h1>
    <Products items={relatedProduct} />
    </>
  );
};

export default ProductDetail;
