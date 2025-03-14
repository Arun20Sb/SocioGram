// src/layouts/RootLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="relative w-full">
      <Navbar />
      <div className="flex">
        <div className="hidden md:block md:w-72 relative h-full">
          <LeftSidebar />
        </div>

        <section className="h-full w-full text-gray-100">
          <Outlet />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
