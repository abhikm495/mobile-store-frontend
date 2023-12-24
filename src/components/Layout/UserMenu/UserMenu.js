import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMedia } from "use-media";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia({ maxWidth: 768 });
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen ${
        isOpen ? "w-64" : "w-16"
      }  overflow-y-auto transition-all ease-in-out duration-300`}
    >
      {/* Open/Close Icon */}
      <div className="p-4 cursor-pointer" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
      </div>
      {isOpen && (
        <ul className="p-4">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <li className="mb-2">
            <NavLink
              to="/dashboard/user/profile"
              className="block py-2 px-4 rounded transition duration-300 hover:bg-gray-600"
            >
              Profile
            </NavLink>
          </li>
          {/* <li className="mb-2">
            <NavLink
              to="/dashboard/user/orders"
              className="block py-2 px-4 rounded transition duration-300 hover:bg-gray-600"
            >
              Orders
            </NavLink>
          </li> */}
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
