import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = scrollPosition > 50 ? 0.95 : scrollPosition / 50;
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div
    className="flex fixed top-0 justify-between items-center p-4 w-full z-10 text-white"
    style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
     >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        className="w-24 md:w-32 cursor-pointer"
      />
      <nav>
        <ul className="flex gap-3 items-center">
          <li>
            <Link to="/" className="hover:text-gray-300 text-xl">
              Home
            </Link>
          </li>
          {userid ? (
            <li>
              <button
                onClick={handleSignout}
                className="hover:text-gray-300 bg-red-600 p-2 rounded-lg"
              >
                Signout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-300 bg-red-600 p-2 rounded-lg">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;