// src/layouts/RootLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Navbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full text-gray-100">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
