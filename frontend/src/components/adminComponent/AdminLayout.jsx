import { Navigate, Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { isAuthenticated } from "../../auth";

const AdminLayout = () => {
  if (!isAuthenticated || isAuthenticated().user.role !== 1) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </>
  );
};

export default AdminLayout;