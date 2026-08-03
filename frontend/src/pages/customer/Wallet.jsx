import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


function Wallet(){


  const [wallet,setWallet] = useState(null);

  const [amount,setAmount] = useState("");



  useEffect(()=>{

    fetchWallet();

  },[]);



  const fetchWallet = async()=>{

    try{

      const response = await api.get(
        "/wallet/"
      );

      setWallet(response.data);


    }catch(error){

      console.log(error);

    }

  };




  const recharge = async()=>{


    try{


      await api.post(
        "/wallet/recharge",
        {
          amount:Number(amount)
        }
      );


      alert(
        "Wallet Recharged Successfully 💰"
      );


      setAmount("");

      fetchWallet();



    }catch(error){

      console.log(error);

    }


  };




  return(

    <>

    <Navbar />


    <div className="flex">


    <Sidebar />


    <div className="flex-1 p-8">


    <h1 className="text-4xl font-bold mb-8">
      My Wallet 💰
    </h1>



    {
      wallet &&

      <div className="bg-white shadow rounded-xl p-6 max-w-xl">


        <h2 className="text-2xl font-bold">
          Balance
        </h2>


        <p className="text-3xl mt-3">
          ₹{wallet.balance}
        </p>



        <h2 className="text-2xl font-bold mt-6">
          Reward Points ⭐
        </h2>


        <p className="text-3xl mt-3">
          {wallet.reward_points}
        </p>




        <input

          value={amount}

          onChange={(e)=>setAmount(e.target.value)}

          placeholder="Enter recharge amount"

          className="border p-3 rounded mt-6 w-full"

        />



        <button

          onClick={recharge}

          className="bg-green-600 text-white px-5 py-3 rounded mt-4 w-full"

        >

          Recharge Wallet 💰

        </button>



      </div>

    }



    </div>


    </div>


    </>

  );

}


export default Wallet;