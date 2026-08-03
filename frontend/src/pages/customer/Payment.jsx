import { useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


function Payment(){


  const [method,setMethod] = useState("COD");


  const orderId = 1;

  const amount = 2340;



  const makePayment = async()=>{


    try{


      const response = await api.post(
        "/payments/",
        {
          order_id: orderId,
          payment_method: method,
          amount: amount
        }
      );


      alert(
        "Payment Created Successfully"
      );


      console.log(response.data);



    }catch(error){

      console.log(error);

      alert(
        "Payment Failed"
      );

    }


  };



  return (

    <>

    <Navbar />


    <div className="flex">


    <Sidebar />


    <div className="flex-1 p-8">


    <h1 className="text-4xl font-bold mb-8">
      Payment 💳
    </h1>



    <div className="bg-white shadow rounded-xl p-6 max-w-xl">


      <h2 className="text-2xl font-bold mb-5">
        Select Payment Method
      </h2>



      <div className="space-y-4">


      <label>
        <input
          type="radio"
          value="CARD"
          checked={method==="CARD"}
          onChange={(e)=>setMethod(e.target.value)}
        />

        {" "}Credit / Debit Card 💳

      </label>



      <label>
        <input
          type="radio"
          value="UPI"
          checked={method==="UPI"}
          onChange={(e)=>setMethod(e.target.value)}
        />

        {" "}UPI 📱

      </label>




      <label>
        <input
          type="radio"
          value="NET_BANKING"
          checked={method==="NET_BANKING"}
          onChange={(e)=>setMethod(e.target.value)}
        />

        {" "}Net Banking 🏦

      </label>




      <label>
        <input
          type="radio"
          value="COD"
          checked={method==="COD"}
          onChange={(e)=>setMethod(e.target.value)}
        />

        {" "}Cash On Delivery 💵

      </label>




      <label>
        <input
          type="radio"
          value="WALLET"
          checked={method==="WALLET"}
          onChange={(e)=>setMethod(e.target.value)}
        />

        {" "}Wallet 💰

      </label>


      </div>



      <h3 className="text-xl font-bold mt-6">
        Amount: ₹{amount}
      </h3>




      <button

        onClick={makePayment}

        className="bg-green-600 text-white px-5 py-3 rounded mt-6 w-full"

      >

        Pay Now

      </button>



    </div>



    </div>


    </div>


    </>

  );

}


export default Payment;