import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { isAuthenticated } from "../../auth";
import { toast } from "react-toastify";

const CategoryList = () => {
  const { token } = isAuthenticated();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/categorylist`)
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch categories.");
        setLoading(false);
      });
  }, []);

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(`/api/deletecategory/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Category deleted successfully");
          setCategory(category.filter((cat) => cat._id !== id));
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete category. Please try again.");
        });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {category.map((item) => {
            const { _id, category_name } = item;
            return (
              <tr
                key={_id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category_name}
                </th>

                <td className="px-6 py-4">
                 <div className="flex gap-x-5">
                 <Link
                    to={`/admin/updatecategory/${_id}`}
                    className="text-3xl font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-blue-300"
                  >
                    <FaEdit />
                  </Link>
                  <Link
                    to="#"
                    onClick={() => handleDeleteCategory(_id)}
                    className="text-3xl font-medium text-red-600 hover:underline hover:text-red-300"
                  >
                    <RiDeleteBin5Line />
                  </Link>
                 </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;