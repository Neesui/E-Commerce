import { useState, useEffect } from "react";
import axios from "axios";
import { isAuthenticated } from "../../auth";


const Addproduct = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = isAuthenticated();

  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    countInStock: "",
    product_image: "",
    category: "",
  });

  const {
    product_name,
    product_price,
    product_description,
    product_image,
    countInStock,
  } = product;

  useEffect(() => {
    axios
      .get(`/api/categorylist`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const onHandleChange = (name) => (e) => {
    setProduct({
      ...product,
      [name]: e.target.value,
    });
  };

  const onHandleImage = (e) => {
    setProduct({
      ...product,
      product_image: e.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_price", product.product_price);
      formData.append("product_description", product.product_description);
      formData.append("product_image", product.product_image);
      formData.append("countInStock", product.countInStock);
      formData.append("category", product.category);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post("/api/postproduct", formData, config);

      setSuccess("Product added successfully!");
      setError("");
      setProduct({
        product_name: "",
        product_price: "",
        product_description: "",
        product_image: "",
        countInStock: "",
        category: "",
      });

      setTimeout(() => setSuccess(""), 3000); 
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess("");
      console.error("Error adding product:", err);
    }
  };

  const showError = () =>
    error && (
      <div
        className="bg-red-100 text-red-800 p-4 rounded-lg"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span>{error}</span>
      </div>
    );

  const showSuccess = () =>
    success && (
      <div
        className="bg-green-100 text-green-800 p-4 rounded-lg"
        role="alert"
      >
        <strong className="font-bold">Success: </strong>
        <span>{success}</span>
      </div>
    );

  return (
    <>
      <form onSubmit={handleSubmit}>
        {showError()}
        {showSuccess()}

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Product Name
          </label>
          <input
            onChange={onHandleChange("product_name")}
            value={product_name}
            type="text"
            className="block w-full h-11 px-5 bg-white border border-gray-300 rounded-full"
            placeholder="Enter a product name"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Product Price
          </label>
          <input
            onChange={onHandleChange("product_price")}
            value={product_price}
            type="number"
            className="block w-full h-11 px-5 bg-white border border-gray-300 rounded-full"
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Product Description
          </label>
          <input
            onChange={onHandleChange("product_description")}
            value={product_description}
            type="text"
            className="block w-full h-11 px-5 bg-white border border-gray-300 rounded-full"
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Product Image
          </label>
          <input
            onChange={onHandleImage}
            type="file"
            accept="image/*"
            className="block w-full h-11 px-5 bg-white"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Quantity
          </label>
          <input
            onChange={onHandleChange("countInStock")}
            value={countInStock}
            type="number"
            className="block w-full h-11 px-5 bg-white border border-gray-300 rounded-full"
            placeholder="Enter quantity in stock"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Category
          </label>
          <select
            onChange={onHandleChange("category")}
            value={product.category}
            className="block w-full h-11 px-5 bg-white border border-gray-300 rounded-full text-black "
            required
          >
            <option value="" disabled >
              Select a category
            </option>
            {category.map((c) => (
              <option key={c._id} value={c._id} className="text-black bg-white">
                {c.category_name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-52 h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full text-white"
        >
          Add Product
        </button>
      </form>
    </>
  );
};

export default Addproduct;