import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
import Layout from "../../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="flex">
        <AdminMenu />
        <div className="col-md-9 p-4 w-full mt-5 mx-auto flex flex-col">
          <SearchBar />
          <h1 className="mt-2 text-3xl font-bold mb-6 text-center">
            ALL PRODUCTS LIST
          </h1>
          <div className=" grid grid-cols-[360px] py-24 md:py-32  md:grid-cols-[370px,370px] lg:grid-cols-[370px,370px,370px] justify-center gap-y-20 overflow-hidden">
            {products.map((p) => (
              <div key={p._id} className="mb-8">
                <ProductCard
                  slug={p.slug}
                  img={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                  name={p.name}
                  price={p.price}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Products;
