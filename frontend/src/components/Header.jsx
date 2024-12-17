import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flame, LogOut, Menu, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // header component
    <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg">
      {/* first div defines margin, and padding */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* second header defines the flex with items center  of the logo on the left and the button on the right */}
        <div className="flex items-center justify-between">
          <Link to={"/"} className="flex items-center space-x-2">
            <Flame className="w-8 h-8 text-white" />
            <span className="text-white font-bold text-2xl">Pair Pal</span>
          </Link>
          {/* {button on the right} */}
          <div className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <div className="relative" ref={dropDownRef}>
                <button
                  onClick={() => setDropDown(!dropDown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={authUser.image || "/user.png"}
                    className="h-10 w-10 object-cover rounded-full border-2 border-white"
                    alt="user_image"
                  />
                  <span className="text-white font-medium">
                    {authUser.name}
                  </span>
                </button>
                {dropDown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setDropDown(false)}
                    >
                      <User className="mr-2" size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="mr-2" size={16} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to={"/auth"}
                  className="text-white hover:text-pink-200 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to={"/auth"}
                  className="bg-white text-pink-600 px-4 py-2 rounded-full font-medium hover:bg-pink-100 transition duration-150 ease-in-out"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          {/* mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {mobileMenuOpen && (
        // menu container
        <div className="md:hidden bg-pink-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {authUser ? (
              <>
                <Link
                  to={"/profile"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700"
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
