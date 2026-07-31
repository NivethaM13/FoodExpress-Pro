import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function Orders() {

  const [orders, setOrders] = useState([]);



  useEffect(() => {

    fetchOrders();

  }, []);



  const fetchOrders = async () => {

    try {

      const response = await api.get(
        "/orders/"
      );

      setOrders(response.data);

    } catch(error) {

      console.log(error);

    }

  };



  const cancelOrder = async(id)=>{

    try{

      await api.put(
        `/orders/${id}/cancel`
      );

      alert(
        "Order Cancelled"
      );

      fetchOrders();


    }catch(error){

      console.log(error);

    }

  };



  const reorder = async(id)=>{

    try{

      await api.post(
        `/orders/${id}/reorder`
      );

      alert(
        "Order Reordered"
      );


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
            My Orders 📦
          </h1>



          {orders.length === 0 && (

            <p className="text-xl">
              No Orders Found
            </p>

          )}



          <div className="space-y-5">


          {orders.map((order)=>(


            <div
              key={order.id}
              className="bg-white shadow rounded-xl p-6"
            >


              <h2 className="text-2xl font-bold">
                Order ID: #{order.id}
              </h2>


              <p className="mt-2">
                Total Amount:
                <b> ₹{order.total_amount}</b>
              </p>


              <p>
                Status:
                <span className="font-bold">
                  {" "}{order.order_status}
                </span>
              </p>


              <p>
                Payment:
                {" "}{order.payment_status}
              </p>


              <p>
                Address:
                {" "}{order.delivery_address}
              </p>



              <div className="mt-4 flex gap-3">


                <button

                  onClick={()=>cancelOrder(order.id)}

                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel Order
                </button>



                <button

                  onClick={()=>reorder(order.id)}

                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Reorder
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


export default Orders;