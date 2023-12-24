import React, { useState } from "react";
import {
  MobileIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { BsCart3 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
// import SearchBar from "./SearchBar/SearchBar";
import { useCart } from "../context/cart";
import { Badge } from "antd";
import { AiOutlineMobile } from "react-icons/ai";
const Header = () => {
  let [open, setOpen] = useState(false);

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout successful");
  };

  return (
    <div className={`shadow-md top-0 left-0 ${open ? "fixed" : ""}`}>
      <div className="flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <AiOutlineMobile className="w-7 h-7 text-blue-400" />
          <span className="whitespace-nowrap">Mobile Store</span>
        </div>

        {/* Menu icon */}

        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            <NavLink
              to="/"
              className="text-gray-800 hover:text-blue-400 duration-500"
            >
              Home
            </NavLink>
          </li>
          {!auth.user ? (
            <>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <NavLink
                  to="/register"
                  className="text-gray-800 hover:text-blue-400 duration-500"
                >
                  Register
                </NavLink>
              </li>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <NavLink
                  to="/login"
                  className="text-gray-800 hover:text-blue-400 duration-500"
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <NavLink
                  to="/"
                  onClick={handleLogout}
                  className="text-gray-800 hover:text-blue-400 duration-500"
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            <NavLink
              to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              className="text-gray-800 hover:text-blue-400 duration-500"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="md:ml-8 md:my-0 my-7 font-semibold relative">
            <NavLink
              to="/cart"
              className="text-gray-800 hover:text-blue-400 transition duration-300 ease-in-out"
            >
              <BsCart3 className="size-6" />
            </NavLink>
            <Badge
              size="small"
              count={cart?.length}
              showZero
              className="absolute top-[-10px] left-5  mt-1 mr-2"
            />
          </li>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Header;
