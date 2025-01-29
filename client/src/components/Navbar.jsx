import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "../api/auth/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logOut(); // Will handle token expiration
      toast.success(response.message || "Logout successful! 🎉");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      // If token expired, handle error and clear cookies
      toast.error(error.message || "Session expired. Please log in again. 😞");
      navigate("/login");
    }
  };

  return (
    <nav className="absolute w-full py-4 px-5 z-20">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <h2 className="text-2xl font-semibold flex items-center justify-center text-gray-50 sm:hidden">
          <img
            src="https://img.icons8.com/?size=100&id=43625&format=png&color=000000"
            alt="SocioGram"
            className="w-11 h-11 inline-block mx-3"
          />
          <span>SocioGram</span>
        </h2>

        {/* Menu Items */}
        <div className="space-x-4 flex sm:absolute right-6 top-5">
          {/* Profile Icon with Tooltip */}
          <div className="relative group">
            <Link to="/" className="text-white">
              <img
                src="https://img.icons8.com/?size=64&id=GKa451kLBjuW&format=png"
                alt="Profile"
                className="w-11 h-11 cursor-pointer"
              />
            </Link>
            <span className="absolute font-semibold top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 text-gray-800 bg-gray-200 px-2 py-1 rounded-md text-sm transition-all duration-[400ms] ease-in-out">
              Profile
              {/* Triangle */}
              <span className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-gray-200"></span>
            </span>
          </div>

          {/* Logout Icon with Tooltip */}
          <div className="relative group">
            <button className="text-white" onClick={handleLogout}>
              <img
                src="https://img.icons8.com/?size=100&id=W9oSY4G5TPcN&format=png&color=000000"
                alt="Logout"
                className="w-11 h-11 cursor-pointer"
              />
            </button>
            <span className="absolute font-semibold top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 text-gray-800 bg-gray-200 px-2 py-1 rounded-md text-sm transition-all duration-[400ms] ease-in-out">
              Logout
              {/* Triangle */}
              <span className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-gray-200"></span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
