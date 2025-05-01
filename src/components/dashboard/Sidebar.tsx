import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../api/AuthCalls";

import useUserProfile from "../../hooks/useUserProfile";

import {
  MenuIcon,
  HomeIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";

const Sidebar = () => {
  const { userProfile } = useUserProfile();

  const navigate = useNavigate();
  // State to manage sidebar open/close (for mobile devices)
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsOpen(true);

  // Close sidebar (used for backdrop click)
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      const res = await signOutUser();
      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button (only visible on small screens) */}
      <div className="md:hidden flex p-4">
        <button onClick={toggleSidebar}>
          <MenuIcon className="text-gray-700" size={28} />
        </button>
      </div>

      {/* Backdrop when sidebar is open (clicking it closes the sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-30 h-full w-54 bg-white shadow-md rounded-r-2xl
          p-4 flex flex-col justify-between font-sans
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-60
        `}
      >
        {/* Top Section */}
        <div>
          {/* Logo section */}
          <div className="flex items-center px-3 py-4 mb-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Logoipsum</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 px-2 py-4">
            {/* Home Link */}
            <a
              href="#"
              className="flex items-center gap-3 text-gray-700 hover:text-black transition"
            >
              <HomeIcon size={20} />
              <span className="text-base font-medium">Home</span>
            </a>

            {/* Profile Link */}
            <a
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 text-gray-700 hover:text-black transition cursor-pointer"
            >
              <UserIcon size={20} />
              <span className="text-base font-medium">Profile</span>
            </a>

            {/* Settings Link */}
            <a
              href="#"
              className="flex items-center gap-3 text-gray-700 hover:text-black transition"
            >
              <SettingsIcon size={20} />
              <span className="text-base font-medium">Settings</span>
            </a>
            {/* Logout Link */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-gray-700 hover:text-black transition"
            >
              <LogOutIcon size={20} />
              <span className="text-base font-medium">Log out</span>
            </button>
          </nav>
        </div>

        {/* Bottom Section - User Profile Info */}
        <div className="flex items-center gap-3 px-3 pt-3 border-t border-gray-200">
          {/* Profile Image */}
          <img
            src={`${userProfile?.avatar as string}`}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* User Info */}
          <div className="flex flex-col">
            <span className="text-gray-800 font-semibold text-sm">
              {`${userProfile?.first_name} ${userProfile?.last_name}`}
            </span>
            <span className="text-gray-500 text-xs">{userProfile?.role}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
