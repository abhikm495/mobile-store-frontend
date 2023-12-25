import React, { useState } from "react";
import {
  MobileIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { BsCart3, BsMenuButton, BsOpencollective } from "react-icons/bs";
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

  const [menuState, setMenuState] = useState("menu");

  const handleMenuClick = () => {
    let list = document.querySelector("ul");

    if (menuState === "menu") {
      setMenuState("close");
      list.classList.add("top-[80px]");
      list.classList.add("opacity-100");
    } else {
      setMenuState("menu");
      list.classList.remove("top-[80px]");
      list.classList.remove("opacity-100");
    }
  };

  return (
    <body className="bg-cyan-400">
      <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center ">
          <span className="text-2xl font-[Poppins] cursor-pointer">
            <img
              className="h-10 inline"
              src="https://static.vecteezy.com/system/resources/previews/005/242/944/non_2x/phone-icon-telephone-icon-symbol-in-hand-for-app-and-messenger-free-vector.jpg"
              alt="img"
            />
            Phone Bazaar
          </span>

          <span
            className="text-3xl cursor-pointer mx-2 md:hidden block"
            onClick={handleMenuClick}
          >
            {menuState === "menu" ? (
              <ion-icon name="menu">
                {/* <Bars3BottomRightIcon> */}
                open
                {/* </Bars3BottomRightIcon> */}
              </ion-icon>
            ) : (
              <ion-icon name="close">
                close
                {/* <XMarkIcon name="close" /> */}
              </ion-icon>
            )}
          </span>
        </div>

        <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
          <li className="mx-4 my-6 md:my-0">
            <NavLink
              to="/"
              className="text-xl hover:text-cyan-500 duration-500"
            >
              HOME
            </NavLink>
          </li>
          {!auth?.user ? (
            <>
              {" "}
              <li className="mx-4 my-6 md:my-0">
                <NavLink
                  to="/register"
                  className="text-xl hover:text-cyan-500 duration-500"
                >
                  REGISTER
                </NavLink>
              </li>
              <li className="mx-4 my-6 md:my-0">
                <NavLink
                  to="/login"
                  className="text-xl hover:text-cyan-500 duration-500"
                >
                  LOGIN
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li className="mx-4 my-6 md:my-0">
                <NavLink
                  to="/"
                  className="text-xl hover:text-cyan-500 duration-500"
                >
                  LOGOUT
                </NavLink>
              </li>
            </>
          )}

          <li className="mx-4 my-6 md:my-0">
            <NavLink
              to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              className="text-xl hover:text-cyan-500 duration-500"
            >
              DASHBOARD
            </NavLink>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <NavLink
              to="/cart"
              className="text-xl hover:text-cyan-500 duration-500 relative"
            >
              <BsCart3 className="size-6" />
              <Badge
                size="small"
                count={cart?.length}
                showZero
                className="absolute bottom-5 left-4"
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </body>
  );
};

export default Header;
