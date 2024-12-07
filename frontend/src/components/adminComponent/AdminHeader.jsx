import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { isAuthenticated } from "../../auth";

const AdminHeader = () => {
  const navigate = useNavigate();

  if (!isAuthenticated || isAuthenticated().user.role !== 1) {
    return <Navigate to="/login" />;
  }
  
  const { user } = isAuthenticated();

  return (
    <>
      <Sidebar />
    </>
  );
};

export default AdminHeader;