import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UserProductCard = ({ product, slug, img, name, price }) => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap">
      <div className=" m-2 border border-black hover:cursor-pointer">
        <img
          src={img}
          className="mt-2 w-full h-[300px] object-contain"
          alt={name}
        />
        <div className="bg-gray-400  bg-opacity-25 w-full overflow-auto">
          <div className="flex flex-row justify-between">
            <h5 className="mx-2 text-xl font-semibold mb-2">{name}</h5>
            <h5 className="text-xl mx-2 mb-2 text-green-500 font-bold">
              ${price}
            </h5>
          </div>
          <div className="flex flex-row justify-evenly mb-2 ">
            <button
              onClick={() => navigate(`/product/${slug}`)}
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ms-1 "
            >
              More Details
            </button>
            <button
              className=" bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 ms-1"
              onClick={() =>
                navigate(`/dashboard/admin/update-product/${slug}`)
              }
            >
              UPDATE INFO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProductCard;

//  <Link to=></Link>
