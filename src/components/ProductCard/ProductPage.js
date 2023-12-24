import React, { useState } from "react";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

const ProductPage = ({
  product,
  img,
  name,
  price,
  type,
  os,
  processor,
  memory,
  description,
}) => {
  const [cart, setCart] = useCart();
  return (
    <div className=" mt-20 mx-auto my-auto flex flex-col justify-between lg:flex-row gap-16 lg:items-center items-center">
      <div className="flex flex-col gap-6 lg:w-2/4 ml-10">
        <img
          src={img}
          alt=""
          className="w-[400px] h-[400px] aspect-square object-contain rounded-xl"
        />
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-2/4 mx-4">
        <div>
          <span className=" text-violet-600 font-semibold">{name}</span>
        </div>
        <p className="text-gray-700">
          {description ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, inventore earum saepe totam, dignissimos adipisci, necessitatibus sed ea harum facilis iusto repellendus. Asperiores repudiandae ipsa voluptatibus perferendis optio nulla harum?"}
        </p>
        <div className="flex space-x-4">
          <div className="flex flex-wrap">
            <div className="flex items-center mr-4 mb-2">
              <span className="font-semibold mr-1">Type:</span>
              <span>{type}</span>
            </div>

            <div className="flex items-center mr-4 mb-2">
              <span className="font-semibold mr-1">Processor:</span>
              <span>{processor}</span>
            </div>

            <div className="flex items-center mr-4 mb-2">
              <span className="font-semibold mr-1">OS:</span>
              <span>{os}</span>
            </div>

            <div className="flex items-center mb-2">
              <span className="font-semibold mr-1">Memory:</span>
              <span>{memory}</span>
            </div>
          </div>
        </div>

        <h6 className="text-2xl font-semibold">${price}</h6>
        <div className="flex flex-col justify-center gap-12 mb-3 ">
          <button
            onClick={() => {
              setCart([...cart, { product }]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
            className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
