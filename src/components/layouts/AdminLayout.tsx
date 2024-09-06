import { Outlet } from "react-router-dom";
import Navbar from "../ui/navbar/Navbar";


const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
