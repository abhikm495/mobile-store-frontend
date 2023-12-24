import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
const UpdateProduct = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [processor, setProcessor] = useState("");
  const [memory, setMemory] = useState("");
  const [os, setOs] = useState("");
  const [photo, setPhoto] = useState("");
  const params = useParams();
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product/${params.slug}`
      );

      setId(data.product._id);
      setName(data.product.name);
      setPrice(data.product.price);
      setType(data.product.type);
      setProcessor(data.product.processor);
      setMemory(data.product.memory);
      setOs(data.product.os);
      setPhoto(data.product.photo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("type", type);
      productData.append("processor", processor);
      productData.append("memory", memory);
      productData.append("os", os);
      photo && productData.append("photo", photo);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,
        productData
      );
      if (!data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminMenu />
        <div className="col-md-9 p-4 w-full flex flex-col items-center mt-20">
          <h1 className="text-3xl font-bold mb-4">Update Product</h1>
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
              {photo ? (
                <>
                  {" "}
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="rounded object-contain h-48 w-full sm:h-64 md:h-80 lg:h-96 xl:h-120"
                    />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${id}`}
                      alt="product_photo"
                      className="rounded object-contain h-48 w-full sm:h-64 md:h-80 lg:h-96 xl:h-120"
                    />
                  </div>
                </>
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
            <div className="mb-4 flex justify-center gap-5">
              <button
                className="w-80 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue "
                onClick={handleUpdate}
              >
                Update Product
              </button>
              <button
                className="w-80 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-blue "
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UpdateProduct;
