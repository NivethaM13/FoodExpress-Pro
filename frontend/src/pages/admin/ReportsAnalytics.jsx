import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";



function ReportsAnalytics() {


  const [sales,setSales] = useState({});

  const [restaurants,setRestaurants] = useState({});

  const [delivery,setDelivery] = useState({});

  const [customers,setCustomers] = useState({});





  useEffect(()=>{

    fetchReports();

  },[]);






  const fetchReports = async()=>{

    try{


      const salesData = await api.get(
        "/reports/sales"
      );


      const restaurantData = await api.get(
        "/reports/restaurants"
      );


      const deliveryData = await api.get(
        "/reports/delivery"
      );


      const customerData = await api.get(
        "/reports/customers"
      );



      setSales(
        salesData.data
      );


      setRestaurants(
        restaurantData.data
      );


      setDelivery(
        deliveryData.data
      );


      setCustomers(
        customerData.data
      );


    }
    catch(error){

      console.log(error);

    }

  };






  const download = (type)=>{

    window.open(

      `http://127.0.0.1:8000/reports/export/${type}`,

      "_blank"

    );

  };






  return (

    <>

    <Navbar />


    <div className="flex">


      <Sidebar />


      <div className="flex-1 p-8">


        <h1 className="text-4xl font-bold mb-8">

          📊 Reports & Analytics

        </h1>






        <div className="grid grid-cols-2 gap-6">



          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-bold">
              💰 Sales Reports
            </h2>

            <p>
              Orders:
              {sales.total_orders || 0}
            </p>

            <p>
              Revenue:
              ₹{sales.total_sales || 0}
            </p>

          </div>







          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-bold">
              🍽 Restaurant Reports
            </h2>

            <p>
              Total Restaurants:
              {restaurants.total_restaurants || 0}
            </p>

          </div>







          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-bold">
              🚴 Delivery Reports
            </h2>

            <p>
              Assigned:
              {delivery.assigned_deliveries || 0}
            </p>

            <p>
              Completed:
              {delivery.completed_deliveries || 0}
            </p>

          </div>








          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-bold">
              👥 Customer Reports
            </h2>

            <p>
              Customers:
              {customers.total_customers || 0}
            </p>

          </div>


        </div>







        <div className="mt-10 bg-gray-100 p-6 rounded-xl">


          <h2 className="text-2xl font-bold mb-5">

            Export Reports

          </h2>



          <div className="flex gap-5">


            <button

            onClick={()=>download("pdf")}

            className="bg-red-600 text-white px-5 py-3 rounded-lg"

            >

            📄 Export PDF

            </button>




            <button

            onClick={()=>download("excel")}

            className="bg-green-600 text-white px-5 py-3 rounded-lg"

            >

            📗 Export Excel

            </button>




            <button

            onClick={()=>download("csv")}

            className="bg-blue-600 text-white px-5 py-3 rounded-lg"

            >

            📘 Export CSV

            </button>



          </div>


        </div>




      </div>


    </div>


    </>

  );

}


export default ReportsAnalytics;