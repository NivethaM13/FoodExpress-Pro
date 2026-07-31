import { Link } from "react-router-dom";
import { getRole } from "../services/auth";

function Sidebar() {
  const role = getRole();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        🍔 FoodExpress
      </h2>


      <ul className="space-y-4">


        {/* ADMIN MENU */}
        {role === "ADMIN" && (
          <>
            <li>
              <Link
                to="/admin/dashboard"
                className="block hover:text-orange-400"
              >
                Dashboard
              </Link>
            </li>


            <li>
              <Link
                to="/admin/restaurants"
                className="block hover:text-orange-400"
              >
                Restaurants
              </Link>
            </li>


            <li>
              <Link
                to="/admin/users"
                className="block hover:text-orange-400"
              >
                Users
              </Link>
            </li>


            <li>
              <Link
                to="/admin/verification"
                className="block hover:text-orange-400"
              >
                Verification Requests
              </Link>
            </li>

          </>
        )}



        {/* RESTAURANT OWNER MENU */}
        {role === "RESTAURANT_OWNER" && (
          <>
            <li>
              <Link
                to="/restaurant/dashboard"
                className="block hover:text-orange-400"
              >
                Dashboard
              </Link>
            </li>
<li>
  <Link
    to="/restaurant/settings"
    className="block hover:text-orange-400"
  >
    Restaurant Settings
  </Link>
</li>

<li>
  <Link
    to="/restaurant/kitchen"
    className="block hover:text-orange-400"
  >
    Kitchen Dashboard 🍳
  </Link>
</li>

            <li>
              <Link
                to="/restaurant/my-restaurant"
                className="block hover:text-orange-400"
              >
                My Restaurant
              </Link>
            </li>




            <li>
              <Link
                to="/restaurant/verification"
                className="block hover:text-orange-400"
              >
                Verification
              </Link>
            </li>




            <li>
              <Link
                to="/restaurant/verification-status"
                className="block hover:text-orange-400"
              >
                Verification Status
              </Link>
            </li>




            <li>
              <Link
                to="/restaurant/menu"
                className="block hover:text-orange-400"
              >
                Menu
              </Link>
            </li>

          </>
        )}


        {/* CUSTOMER MENU */}
        {role === "CUSTOMER" && (
          <>
            <li>
              <Link
                to="/customer/home"
                className="block hover:text-orange-400"
              >
                Dashboard
              </Link>
            </li>




            <li>
              <Link
                to="/customer/profile"
                className="block hover:text-orange-400"
              >
                My Profile
              </Link>
            </li>

<li>
  <Link
    to="/customer/orders"
    className="block hover:text-orange-400"
  >
    My Orders 📦
  </Link>
</li>




<li>
  <Link
    to="/customer/cart"
    className="block hover:text-orange-400"
  >
    My Cart 🛒
  </Link>
</li>
            <li>
              <Link
                to="/customer/addresses"
                className="block hover:text-orange-400"
              >
                Delivery Addresses
              </Link>
            </li>


            <li>
              <Link
                to="/customer/favorites"
                className="block hover:text-orange-400"
              >
                Favorite Restaurants 🍳
              </Link>
            </li>


            <li>
              <Link
                to="/customer/preferences"
                className="block hover:text-orange-400"
              >
                Order Preferences
              </Link>
            </li>

<li>
  <Link
    to="/customer/checkout"
    className="block hover:text-orange-400"
  >
    Checkout 🛒
  </Link>
</li>


<li>
  <Link
    to="/customer/menu"
    className="block hover:text-orange-400"
  >
    Food Menu 🍔
  </Link>
</li>

          </>
        )}




        {/* DELIVERY PARTNER MENU */}
        {role === "DELIVERY_PARTNER" && (
          <>
            <li>
              <Link
                to="/delivery/dashboard"
                className="block hover:text-orange-400"
              >
                Dashboard
              </Link>
            </li>


<li>
  <Link
    to="/delivery/dashboard"
    className="block hover:text-orange-400"
  >
    Delivery Dashboard 🚴
  </Link>
</li>

            <li>
              <Link
                to="/delivery/orders"
                className="block hover:text-orange-400"
              >
                Assigned Orders
              </Link>
            </li>

          </>
        )}


      </ul>


    </div>
  );
}

export default Sidebar;