import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function DeliveryDashboard() {


  const [orders, setOrders] = useState([]);



  useEffect(()=>{

    fetchOrders();

  },[]);



  const fetchOrders = async()=>{

    try{

      const response = await api.get(
        "/delivery/orders"
      );


      setOrders(response.data);


    }catch(error){

      console.log(error);

    }

  };




  const markDelivered = async(id)=>{

    try{

      await api.put(
        `/delivery/orders/${id}/delivered`
      );


      alert(
        "Order Delivered Successfully"
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
          Delivery Dashboard 🚴
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


            <p>
              Amount:
              ₹{order.total_amount}
            </p>


            <p>
              Address:
              {order.delivery_address}
            </p>


            <p>
              Status:
              <b>
                {" "}
                {order.order_status}
              </b>
            </p>



            <button

              onClick={()=>markDelivered(order.id)}

              className="bg-green-600 text-white px-4 py-2 rounded mt-5 w-full"

            >

              Mark Delivered ✅

            </button>



          </div>


        ))}



        </div>


      </div>


    </div>


    </>

  );

}


export default DeliveryDashboard;