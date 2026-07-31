import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function Menu() {

  const [menus, setMenus] = useState([]);


  useEffect(() => {
    fetchMenus();
  }, []);



  const fetchMenus = async () => {

    try {

      const response = await api.get("/menus/");

      setMenus(response.data);

    } catch(error) {

      console.log(error);

    }

  };



  const addToCart = async (menu_id) => {

    try {

      await api.post(
        "/cart/",
        {
          menu_id: menu_id,
          quantity: 1
        }
      );


      alert("Added to Cart 🛒");


    } catch(error) {

      console.log(error);

      alert("Add to cart failed");

    }

  };



  return (

    <>

    <Navbar />


    <div className="flex">

      <Sidebar />


      <div className="flex-1 p-8">


        <h1 className="text-4xl font-bold mb-8">
          Food Menu 🍔
        </h1>



        <div className="grid grid-cols-3 gap-6">


        {menus.map((item)=>(


          <div
            key={item.id}
            className="bg-white shadow rounded-xl overflow-hidden"
          >


            {item.image && (

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />

            )}



            <div className="p-5">


            <h2 className="text-xl font-bold">
              {item.name}
            </h2>



            <p className="mt-2">
              {item.description}
            </p>



            <p className="mt-2">
              Category:
              <b> {item.category}</b>
            </p>



            <p className="text-xl font-bold mt-2">
              ₹ {item.price}
            </p>



            <p className="mt-2">
              {item.is_available
                ? "Available 🟢"
                : "Unavailable 🔴"
              }
            </p>



            <button

              onClick={()=>addToCart(item.id)}

              disabled={!item.is_available}

              className="bg-orange-600 text-white px-5 py-2 rounded mt-4 w-full"

            >
              Add To Cart 🛒

            </button>


            </div>


          </div>


        ))}


        </div>


      </div>


    </div>


    </>

  );

}


export default Menu;