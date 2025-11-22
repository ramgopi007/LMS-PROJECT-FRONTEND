import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { logoutUser } from "../../features/auth/authThunks";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* BRAND */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          NextLearn
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/courses" className="hover:text-blue-600">Courses</Link>

          {/* Logged In */}
          {isAuthenticated && user ? (
            <>
              <Link to="/profile" className="hover:text-blue-600">
                {user.firstName}
              </Link>

              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-4 pb-4">
          <Link to="/" className="block py-2" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/courses" className="block py-2" onClick={() => setOpen(false)}>Courses</Link>

          {isAuthenticated && user ? (
            <>
              <Link to="/profile" className="block py-2" onClick={() => setOpen(false)}>
                Profile
              </Link>

              <button
                className="block w-full text-left py-2 text-red-500"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/signup" className="block py-2" onClick={() => setOpen(false)}>Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
