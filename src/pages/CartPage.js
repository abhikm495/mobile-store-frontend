import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import toast from "react-hot-toast";
// import DropIn from "braintree-web-drop-in-react";
const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  // const [clientToken, setClientToken] = useState("");
  // const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;

      if (Array?.isArray(cart)) {
        cart?.forEach((item) => {
          const price = parseFloat(item?.price || item?.product?.price);
          if (!isNaN(price)) {
            total += price;
          }
        });
      }

      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.error("Error calculating total price:", error);
      return "Error";
    }
  };
  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white w-full">
            <h1 className="text-4xl font-bold mb-2">
              {`Greetings, ${
                auth?.token && auth?.user?.name ? auth.user.name : "Guest"
              }!`}
            </h1>
            <h4 className="text-lg">
              {cart?.length ? (
                <span>
                  You have{" "}
                  <span className="text-pink-500 font-semibold">
                    {cart.length}
                  </span>{" "}
                  item
                  {cart.length !== 1 ? "s" : ""} in your cart{" "}
                  {auth?.token ? "" : "— please login to checkout"}
                </span>
              ) : (
                "Your Cart Is Empty"
              )}
            </h4>
          </div>
        </div>

        <div className=" l lg:flex xl:flex sm:flex-co">
          <div className="w-full">
            {cart?.map((p, key) => (
              <div
                key={p?._id}
                className="mb-2 p-3 bg-white shadow-md flex flex-row"
              >
                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                  <img
                    key={p?._id || p?.product?._id}
                    src={`${
                      process.env.REACT_APP_API
                    }/api/v1/products/product-photo/${
                      p?._id || p?.product?._id
                    }`}
                    className="w-full h-48 object-contain rounded-t-lg"
                    alt={p?.name}
                    width="100px"
                    height="100px"
                  />
                </div>
                <div className=" md:w-1/2 lg:w-2/3 xl:w-3/4 p-2">
                  <p>{p?.name || p?.product?.name}</p>
                  <p>
                    {p?.description?.substring(0, 30) ||
                      p?.product?.description?.substring(0, 30)}
                  </p>
                  <p>Price : {p?.price || p?.product?.price}</p>
                  <p>type : {p?.type || p?.product?.type}</p>
                  <p>OS: {p?.os || p?.product?.os}</p>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => removeCartItem(p?._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6 sm:justify-center sm:mx-auto md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 text-center  rounded-lg ">
            <h2 className="text-2xl font-bold">Cart Summary</h2>
            <p className="text-gray-500">Total | Checkout | Payment</p>
            <hr className="my-4" />

            <h4 className="text-xl font-bold">Total: {totalPrice()}</h4>

            {auth?.user?.address ? (
              <div className="mb-3">
                <h4 className="text-lg font-semibold">Shipping Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}

            <div className="">
              {!auth?.token || !cart?.length ? (
                ""
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                  onClick={handlePayment}
                  disabled={loading || !auth?.user?.address}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
