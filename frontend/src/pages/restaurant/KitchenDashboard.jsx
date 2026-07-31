import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

function KitchenDashboard() {


  const [orders, setOrders] = useState([]);



  useEffect(() => {

    fetchOrders();

  }, []);



  const fetchOrders = async()=>{

    try{

      const response = await api.get(
        "/kitchen/orders"
      );

      setOrders(response.data);


    }catch(error){

      console.log(error);

    }

  };




  const updateStatus = async(id, action)=>{

    try{


      await api.put(
        `/kitchen/orders/${id}/${action}`
      );


      alert(
        "Order status updated"
      );


      fetchOrders();



    }catch(error){

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
          Kitchen Dashboard 🍳
        </h1>



        <div className="grid grid-cols-3 gap-6">



        {orders.map((order)=>(


          <div
            key={order.id}
            className="bg-white shadow rounded-xl p-6"
          >


            <h2 className="text-xl font-bold">
              Order #{order.id}
            </h2>


            <p className="mt-2">
              Amount:
              ₹{order.total_amount}
            </p>


            <p>
              Status:
              <b>
                {" "}
                {order.order_status}
              </b>
            </p>



            <div className="mt-5 space-y-2">


              <button

                onClick={()=>updateStatus(
                  order.id,
                  "accept"
                )}

                className="bg-green-600 text-white px-4 py-2 rounded w-full"

              >
                Accept Order
              </button>



              <button

                onClick={()=>updateStatus(
                  order.id,
                  "reject"
                )}

                className="bg-red-600 text-white px-4 py-2 rounded w-full"

              >
                Reject Order
              </button>




              <button

                onClick={()=>updateStatus(
                  order.id,
                  "cooking"
                )}

                className="bg-yellow-500 text-white px-4 py-2 rounded w-full"

              >
                Start Cooking
              </button>




              <button

                onClick={()=>updateStatus(
                  order.id,
                  "ready"
                )}

                className="bg-blue-600 text-white px-4 py-2 rounded w-full"

              >
                Ready For Pickup
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


export default KitchenDashboard;