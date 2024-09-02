import { Outlet } from "react-router-dom";
import Navbar from "../ui/navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
