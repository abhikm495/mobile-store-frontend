import axios from "axios";
import Layout from "../components/Layout/Layout";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Radio } from "antd";
import UserProductCard from "../components/ProductCard/UserProductCard";
import { Prices } from "../components/Filter/Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMedia } from "use-media";
import SearchBar from "../components/SearchBar/SearchBar";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // const isMobile = useMedia({ maxWidth: 768 });
  // useEffect(() => {
  //   setIsOpen(!isMobile);
  // }, [isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // const [auth, setAuth] = useAuth();
  // const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [type, setType] = useState([]);
  // const [os, setOs] = useState([]);
  // const [memory, setMemory] = useState([]);
  // const [processor, setProcessor] = useState([]);
  const [radio, setRadio] = useState([]);
  // const [checkedType, setCheckedType] = useState("");
  // const [checkedOs, setCheckedOs] = useState([]);
  // const [checkedMemory, setCheckedMemory] = useState([]);
  // const [checkedProcessor, setCheckedProcessor] = useState([]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      // console.log(data.products);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // useEffect(() => {
  //   const uniqueTypesSet = new Set(products?.map((product) => product?.type));
  //   const uniqueOsSet = new Set(products?.map((product) => product?.os));
  //   const uniqueMemorySet = new Set(
  //     products?.map((product) => product?.memory)
  //   );
  //   const uniqueProcessorSet = new Set(
  //     products?.map((product) => product?.processor)
  //   );
  //   setType(Array.from(uniqueTypesSet));
  //   setOs(Array.from(uniqueOsSet));
  //   setMemory(Array.from(uniqueMemorySet));
  //   setProcessor(Array.from(uniqueProcessorSet));
  // }, [products, checkedType]);

  useEffect(() => {
    if (!radio?.length) getAllProducts();
  }, [radio?.length]);

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (radio?.length) filterProduct();
  }, [radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/product-filters`,
        {
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex overflow-hidden relative">
        <div
          className={`bg-gray-900 text-white min-h-full w-50 absolute z-30 sm:fixed${
            isOpen
              ? "min-w-[10px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px] xl:min-w-[180px]"
              : "max-w-[50px]  sm:min-w-[64px]"
          }  overflow-y-auto transition-all ease-in-out duration-300`}
        >
          {/* Open/Close Icon */}
          <div className="p-4 cursor-pointer" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
          </div>
          {isOpen && (
            <ul className="p-4 flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">Apply filters</h2>
              <li className="mb-4">
                <h1 className="text-lg font-semibold mb-2">Filter by Price</h1>
                <div className="flex flex-col">
                  <Radio.Group
                    value={radio}
                    onChange={(e) => setRadio(e.target.value)}
                  >
                    {Prices?.map((p) => (
                      <div key={p._id} className="mb-2">
                        <Radio value={p.array} className="mr-1 text-white">
                          {p.name}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </li>
              <li className="ml-10 flex justify-center mr-6">
                <button
                  onClick={() => setRadio(null)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  RESET
                </button>
              </li>

              {/* <li className="mb-2">
                <h1>Filter by type</h1>
                <div className="flex flex-col">
                  <div>
                    {type?.map((p) => (
                      <Checkbox
                        key={p}
                        onChange={(e) => setCheckedType(e.target.value)}
                      >
                        {p}
                      </Checkbox>
                    ))}
                  </div>
                </div>
              </li>
              <li className="mb-2">
                <h1>Filter by Operating System</h1>
                <div className="flex flex-col">
                  {os?.map((p) => (
                    <Checkbox
                      key={p}
                      onChange={(e) => setCheckedOs(e.target.value)}
                    >
                      {p}
                    </Checkbox>
                  ))}
                </div>
              </li>
              <li className="mb-2">
                <h1>Filter by Memory</h1>
                <div className="flex flex-col">
                  {memory?.map((p) => (
                    <Checkbox
                      key={p}
                      onChange={(e) => setCheckedMemory(e.target.value)}
                    >
                      {p}
                    </Checkbox>
                  ))}
                </div>
              </li>
              <li className="mb-2">
                <h1>Filter by Processor</h1>
                <div className="flex flex-col">
                  {processor?.map((p) => (
                    <Checkbox
                      key={p}
                      onChange={(e) => setCheckedProcessor(e.target.value)}
                    >
                      {p}
                    </Checkbox>
                  ))}
                </div>
              </li> */}
            </ul>
          )}
        </div>

        <div className="col-md-9 p-4 w-full mt-5 ml-3 sm:mx-auto sm:ml-20 flex flex-col relative">
          <SearchBar />
          <h1 className="text-3xl font-bold mb-6 text-center ml-5 sm:ml-0">
            ALL PRODUCTS LIST
          </h1>
          <div className=" grid grid-cols-[240px] py-24 md:py-32  md:grid-cols-[370px,370px] lg:grid-cols-[370px,370px,370px] justify-center gap-y-20 overflow-hidden">
            {products?.map((p) => (
              <div key={p?._id} className="mb-8">
                <div className="flex flex-wrap">
                  <div className=" m-2 border border-black hover:cursor-pointer">
                    <img
                      onClick={() => navigate(`/product/${p.slug}`)}
                      src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                      className="mt-2 w-full h-[300px] object-contain"
                      alt={p.name}
                    />
                    <div className="bg-gray-400  bg-opacity-25 w-full overflow-auto">
                      <div
                        className="flex flex-row justify-between"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        <h5 className="mx-2 text-xl font-semibold mb-2">
                          {p.name}
                        </h5>
                        <h5 className="text-xl mx-2 mb-2 text-green-500 font-bold">
                          ${p.price}
                        </h5>
                      </div>
                      <div className="flex flex-row justify-evenly mb-2 ">
                        <button
                          onClick={() => navigate(`/product/${p.slug}`)}
                          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ms-1 "
                        >
                          More Details
                        </button>
                        <button
                          className=" bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 ms-1"
                          onClick={() => {
                            setCart([...cart, { p }]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {radio?.length ? (
            <></>
          ) : (
            <>
              <div className="flex justify-center mb-2">
                {products && products.length < total && (
                  <button
                    className="bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-800 focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? (
                      "Loading ..."
                    ) : (
                      <div className="flex flex-col text-center justify-center">
                        Load More
                      </div>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
