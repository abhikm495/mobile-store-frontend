import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
const SearchBar = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  sm:justify-center mb-2">
      <form
        className="flex w-full max-w-4xl"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-grow border border-gray-300 px-2 py-1 rounded"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          className="ml-2 bg-green-500 text-white px-4 py-1 rounded"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
