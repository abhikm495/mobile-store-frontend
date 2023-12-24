import { useNavigate } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [processor, setProcessor] = useState("");
  const [memory, setMemory] = useState("");
  const [os, setOs] = useState("");
  const [photo, setPhoto] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("type", type);
      productData.append("processor", processor);
      productData.append("memory", memory);
      productData.append("os", os);
      productData.append("photo", photo);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/create-product`,
        productData
      );
      if (!data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminMenu />
        <div className="col-md-9 p-4 w-full flex flex-col items-center mt-20">
          <h1 className="text-3xl font-bold mb-4">Create Product</h1>
          <div className="w-3/4 mx-auto">
            <div className="mb-4">
              <label className="cursor-pointer block text-blue-500">
                <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                {photo ? photo.name : "Upload Product Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
            <div className="mb-4">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="rounded object-contain h-48 w-full sm:h-64 md:h-80 lg:h-96 xl:h-120"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={name}
                placeholder="Enter product name"
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={price}
                placeholder="Enter product price"
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={type}
                placeholder="Enter mobile type"
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={processor}
                placeholder="Enter mobile processor"
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                onChange={(e) => setProcessor(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={memory}
                placeholder="Enter mobile memory"
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                onChange={(e) => setMemory(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={os}
                placeholder="Enter mobile os"
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                onChange={(e) => setOs(e.target.value)}
              />
            </div>
            {/* Add similar styling for other input fields */}
            <div className="mb-4 flex justify-center">
              <button
                className="w-80 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue "
                onClick={handleCreate}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateProduct;
