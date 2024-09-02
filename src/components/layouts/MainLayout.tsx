import { Outlet } from "react-router-dom";
import Footer from "../ui/footer/Footer";
import Navbar from "../ui/navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
