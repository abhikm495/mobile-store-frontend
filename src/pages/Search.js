import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";

import UserProductCard from "../components/ProductCard/UserProductCard";
import SearchBar from "../components/SearchBar/SearchBar";

const Search = () => {
  const [values, setValues] = useSearch();
  console.log(values);
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="flex flex-col mt-10 text-center">
          <SearchBar />
          <h1 className="text-2xl font-bold mb-2">Search Results</h1>
          <h6 className="text-sm text-gray-600">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h6>
        </div>
        <div className=" grid grid-cols-[360px] py-24 md:py-32  md:grid-cols-[370px,370px] lg:grid-cols-[370px,370px,370px] justify-center  gap-y-20 overflow-hidden">
          {values?.results.map((p) => (
            <div key={p._id} className="mb-8">
              <UserProductCard
                slug={p.slug}
                img={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                name={p.name}
                price={p.price}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
