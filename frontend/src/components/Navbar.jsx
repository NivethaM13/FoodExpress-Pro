import { Link, useNavigate } from "react-router-dom";
import { getRole, logout } from "../services/auth";

function Navbar() {
  const navigate = useNavigate();
  const role = getRole();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          🍔 FoodExpress Pro
        </Link>

        <div className="flex items-center gap-6">

          <span className="font-medium">
            {role}
          </span>

          <button
            onClick={handleLogout}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;