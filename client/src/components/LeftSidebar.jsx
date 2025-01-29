import { NavLink } from "react-router-dom";
import { links } from "../constants";

const LeftSidebar = () => {
  return (
    <div className="w-64 bg-gray-950 text-white h-screen p-5 max-sm:hidden">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-10">
        <img
          src="https://img.icons8.com/?size=100&id=43625&format=png&color=000000"
          alt="Logo"
          className="w-10 h-10"
        />
        <span className="text-2xl font-semibold">SocioGram</span>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-3 mb-7">
        <img
          src="https://img.icons8.com/?size=64&id=GKa451kLBjuW&format=png"
          alt="User"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">John Doe</p>
          <p className="text-sm text-gray-400">@john_doe</p>
        </div>
      </div>

      {/* Links */}
      <ul className="flex flex-col gap-6">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 text-white py-3 px-3 rounded-md mb-3 cursor-pointer transform transition-all duration-500 ease-in-out ${
                isActive ? "bg-[#887EFE]" : "hover:bg-[#887EFE]"
              }`
            }
          >
            <img
              src={link.icon}
              alt="💀"
              className="group-hover:invert-white w-9 h-9"
            />
            <span className="text-lg">{link.name}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
