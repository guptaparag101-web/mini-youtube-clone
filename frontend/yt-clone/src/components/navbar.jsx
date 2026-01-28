import { GiHamburgerMenu } from "react-icons/gi";
import { FiUpload } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import youtubeLogo from "../assets/images/youtubeimage.jpg";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 z-50 h-14 w-full bg-black border-b border-gray-800 flex items-center justify-between px-4">

      <div className="flex items-center gap-4">
        <GiHamburgerMenu
          size={22}
          className="cursor-pointer"
          onClick={toggleSidebar}
        />
        <img
          src={youtubeLogo}
          alt="YouTube"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <div className=" flex items-center w-[40%]">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-black border border-gray-700 rounded-l-full px-4 py-1.5 text-sm outline-none"
        />
        <button className="bg-gray-800 border border-gray-700 px-4 py-1.5 rounded-r-full">
          <AiOutlineSearch size={18} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-1 hover:bg-gray-800 px-3 py-1.5 rounded-full text-sm"
          >
            <FiUpload size={16} />
            Create
          </button>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-sm hover:text-red-500"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="text-sm hover:text-red-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
