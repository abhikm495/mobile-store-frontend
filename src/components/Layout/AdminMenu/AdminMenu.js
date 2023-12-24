import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import useMedia from "use-media";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMedia({ maxWidth: 768 });
  useEffect(() => {
    // Reset isOpen when transitioning from mobile to larger screens
    setIsOpen(!isMobile);
  }, [isMobile]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gray-800 text-white min-h-[80vh] ${
        isOpen ? "w-64" : "w-16"
      }  overflow-y-auto transition-all ease-in-out duration-300`}
    >
      {/* Open/Close Icon */}
      <div className="p-4 cursor-pointer" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
      </div>
      {isOpen && (
        <ul className="p-4">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <li className="mb-2">
            <NavLink
              to="/dashboard/admin/create-product"
              className="block py-2 px-4 rounded transition duration-300 hover:bg-gray-600"
            >
              Create Product
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              to="/dashboard/admin/products"
              className="block py-2 px-4 rounded transition duration-300 hover:bg-gray-600"
            >
              Products
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/dashboard/admin/users"
              className="block py-2 px-4 rounded transition duration-300 hover:bg-gray-600"
            >
              Users
            </NavLink>
          </li> */}
        </ul>
      )}
    </div>
  );
};

export default AdminMenu;
