import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


function PaymentHistory(){


  const [payments,setPayments] = useState([]);



  useEffect(()=>{

    fetchPayments();

  },[]);



  const fetchPayments = async()=>{

    try{

      const response = await api.get(
        "/payments/history"
      );


      setPayments(response.data);


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
      Payment History 📜
    </h1>



    <div className="grid grid-cols-3 gap-6">



    {payments.map((payment)=>(


      <div
        key={payment.id}
        className="bg-white shadow rounded-xl p-6"
      >


        <h2 className="text-xl font-bold">
          Payment #{payment.id}
        </h2>



        <p className="mt-3">
          Order ID:
          <b> {payment.order_id}</b>
        </p>



        <p>
          Method:
          <b> {payment.payment_method}</b>
        </p>



        <p>
          Amount:
          <b> ₹{payment.amount}</b>
        </p>



        <p>
          Status:
          <b>
            {" "}
            {payment.payment_status}
          </b>
        </p>



        <p>
          Transaction:
          <b>
            {" "}
            {payment.transaction_id || "N/A"}
          </b>
        </p>


      </div>


    ))}



    </div>


    </div>


    </div>


    </>

  );

}


export default PaymentHistory;