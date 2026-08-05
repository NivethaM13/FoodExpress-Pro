import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";



function RefundManagement() {


  const [refunds,setRefunds] = useState([]);




  useEffect(()=>{

    fetchRefunds();

  },[]);





  const fetchRefunds = async()=>{

    try{

      const response = await api.get(
        "/refunds/"
      );

      setRefunds(
        response.data
      );


    }
    catch(error){

      console.log(error);

    }

  };






  const approveRefund = async(id)=>{

    await api.put(
      `/refunds/${id}/approve`
    );

    fetchRefunds();

  };






  const rejectRefund = async(id)=>{

    await api.put(
      `/refunds/${id}/reject`
    );

    fetchRefunds();

  };






  return (

    <>

    <Navbar />


    <div className="flex">


      <Sidebar />


      <div className="flex-1 p-8">


        <h1 className="text-4xl font-bold mb-8">

          💳 Refund Management

        </h1>





        <div className="bg-white shadow rounded-xl overflow-hidden">


          <table className="w-full">


            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">
                  Order ID
                </th>

                <th className="p-3">
                  User ID
                </th>

                <th className="p-3">
                  Amount
                </th>

                <th className="p-3">
                  Reason
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3">
                  Action
                </th>


              </tr>

            </thead>




            <tbody>


            {
              refunds.map((refund)=>(


                <tr
                key={refund.id}
                className="border-b"
                >


                  <td className="p-3 text-center">
                    {refund.order_id}
                  </td>



                  <td className="p-3 text-center">
                    {refund.user_id}
                  </td>




                  <td className="p-3 text-center">
                    ₹{refund.refund_amount}
                  </td>




                  <td className="p-3">
                    {refund.cancellation_reason}
                  </td>




                  <td className="p-3 text-center">

                    {refund.refund_status}

                  </td>




                  <td className="p-3 flex gap-2">


                    <button

                    onClick={()=>approveRefund(refund.id)}

                    className="bg-green-600 text-white px-3 py-1 rounded"

                    >

                    Approve

                    </button>




                    <button

                    onClick={()=>rejectRefund(refund.id)}

                    className="bg-red-600 text-white px-3 py-1 rounded"

                    >

                    Reject

                    </button>


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


export default RefundManagement;