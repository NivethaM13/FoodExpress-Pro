import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function Checkout() {

  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();


  useEffect(() => {

    fetchCart();

  }, []);



  const fetchCart = async()=>{

    try{

      const response = await api.get(
        "/cart/"
      );

      setCart(response.data);

    }catch(error){

      console.log(error);

    }

  };



  const placeOrder = async()=>{

    try{

      await api.post(
        "/orders/",
        {
          delivery_address: address
        }
      );


      alert(
        "Order placed successfully"
      );


      navigate(
        "/customer/orders"
      );


    }catch(error){

      alert(
        "Order failed"
      );

      console.log(error);

    }

  };



  return (

    <>

    <Navbar />


    <div className="flex">

      <Sidebar />


      <div className="flex-1 p-8">


        <h1 className="text-4xl font-bold mb-8">
          Checkout 🛒
        </h1>



        <div className="bg-white shadow rounded-xl p-6 max-w-xl">


          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>


          {cart?.items?.map((item)=>(

            <div
              key={item.id}
              className="border-b py-3"
            >

              <p>
                Food ID: {item.menu_id}
              </p>

              <p>
                Quantity: {item.quantity}
              </p>

              <p>
                Price: ₹{item.price}
              </p>

            </div>

          ))}



          <input

            value={address}

            onChange={(e)=>setAddress(e.target.value)}

            placeholder="Delivery Address"

            className="border p-3 rounded w-full mt-5"

          />



          <button

            onClick={placeOrder}

            className="bg-orange-600 text-white p-3 rounded w-full mt-5"

          >

            Place Order

          </button>


        </div>


      </div>


    </div>


    </>

  );

}


export default Checkout;