import { useEffect, useState } from "react";
import api from "../../services/api";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


function InventoryManagement() {


  const [inventory, setInventory] = useState([]);

  const [alerts, setAlerts] = useState([]);

  const [report, setReport] = useState({});


  const restaurantId = 3;



  useEffect(()=>{

    fetchInventory();

    fetchAlerts();

    fetchReport();

  },[]);





  const fetchInventory = async()=>{

    try{

      const response = await api.get(
        `/inventory/${restaurantId}`
      );

      setInventory(response.data);

    }
    catch(error){

      console.log(error);

    }

  };





  const fetchAlerts = async()=>{

    try{

      const response = await api.get(
        `/inventory/alerts/${restaurantId}`
      );

      setAlerts(response.data);

    }
    catch(error){

      console.log(error);

    }

  };





  const fetchReport = async()=>{

    try{

      const response = await api.get(
        `/inventory/report/${restaurantId}`
      );

      setReport(response.data);

    }
    catch(error){

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

          📦 Inventory Management

        </h1>





        {/* Report Cards */}

        <div className="grid grid-cols-2 gap-6 mb-8">


          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-bold">
              Total Ingredients
            </h2>

            <p className="text-3xl mt-3">
              {report.total_ingredients || 0}
            </p>

          </div>



          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-bold">
              Inventory Value
            </h2>

            <p className="text-3xl mt-3">
              ₹{report.inventory_value || 0}
            </p>

          </div>


        </div>







        {/* Low Stock Alerts */}

        <div className="bg-red-100 rounded-xl p-6 mb-8">


          <h2 className="text-2xl font-bold mb-4">

            ⚠️ Low Stock Alerts

          </h2>



          {
            alerts.length === 0 ?

            <p>
              No Low Stock Items
            </p>

            :

            alerts.map(item=>(

              <p key={item.id}>

                {item.ingredient_name}
                -
                {item.quantity} {item.unit}

              </p>

            ))

          }


        </div>









        {/* Inventory Table */}


        <div className="bg-white shadow rounded-xl p-6">


          <h2 className="text-2xl font-bold mb-5">

            Ingredient Stock

          </h2>



          <table className="w-full">


            <thead>

              <tr className="border-b">

                <th className="p-3">
                  Ingredient
                </th>

                <th className="p-3">
                  Quantity
                </th>

                <th className="p-3">
                  Supplier
                </th>

              </tr>

            </thead>



            <tbody>


            {
              inventory.map(item=>(


                <tr
                key={item.id}
                className="border-b"
                >


                  <td className="p-3">
                    {item.ingredient_name}
                  </td>


                  <td className="p-3">
                    {item.quantity} {item.unit}
                  </td>


                  <td className="p-3">
                    {item.supplier_name}
                  </td>


                </tr>


              ))
            }


            </tbody>


          </table>


        </div>


      </div>


    </div>


    </>

  );

}


export default InventoryManagement;