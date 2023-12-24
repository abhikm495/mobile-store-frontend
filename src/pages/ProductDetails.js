import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProductPage from "../components/ProductCard/ProductPage";

const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <ProductPage
        product={product}
        img={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
        name={product.name}
        price={product.price}
        type={product.type}
        os={product.os}
        processor={product.processor}
        memory={product.memory}
      />
    </Layout>
  );
};

export default ProductDetails;
