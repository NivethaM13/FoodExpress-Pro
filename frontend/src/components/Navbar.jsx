import { Link, useNavigate } from "react-router-dom";
import { getRole, logout } from "../services/auth";
import { useEffect, useState } from "react";
import api from "../services/api";


function Navbar() {

  const navigate = useNavigate();

  const role = getRole();

  const [count, setCount] = useState(0);



  useEffect(() => {

    // Only CUSTOMER can access notifications API
    if (role === "CUSTOMER") {
      fetchUnreadCount();
    }

  }, [role]);




  const fetchUnreadCount = async () => {

    try {

      const response = await api.get(
        "/notifications/"
      );


      const unread = response.data.filter(
        item => !item.is_read
      );


      setCount(
        unread.length
      );


    } catch (error) {

      console.log(error);

    }

  };





  const handleLogout = () => {

    logout();

    navigate("/");

  };




  return (

    <nav className="bg-orange-600 text-white shadow-lg">

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        justify-between
        items-center
        "
      >


        <Link
          to="/"
          className="text-2xl font-bold"
        >
          🍔 FoodExpress Pro
        </Link>




        <div
          className="
          flex
          items-center
          gap-6
          "
        >


          <span className="font-medium">
            {role}
          </span>




          {/* CUSTOMER NOTIFICATION ONLY */}

          {role === "CUSTOMER" && (

            <Link

              to="/customer/notifications"

              className="
              relative
              text-2xl
              "

            >

              🔔


              {
                count > 0 && (

                  <span

                    className="
                    absolute
                    -top-3
                    -right-3
                    bg-red-500
                    text-white
                    text-xs
                    rounded-full
                    px-2
                    "

                  >

                    {count}

                  </span>

                )
              }


            </Link>

          )}





          <button

            onClick={handleLogout}

            className="
            bg-white
            text-orange-600
            px-4
            py-2
            rounded-lg
            hover:bg-gray-100
            transition
            "

          >

            Logout

          </button>



        </div>


      </div>


    </nav>

  );

}


export default Navbar;