import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


function WalletTransactions(){


  const [transactions,setTransactions] = useState([]);



  useEffect(()=>{

    fetchTransactions();

  },[]);



  const fetchTransactions = async()=>{

    try{

      const response = await api.get(
        "/wallet/transactions"
      );


      setTransactions(response.data);


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
        Wallet Transactions 📜
      </h1>



      <div className="grid grid-cols-3 gap-6">


      {
        transactions.map((transaction)=>(


          <div

            key={transaction.id}

            className="bg-white shadow rounded-xl p-6"

          >


            <h2 className="text-xl font-bold">
              Transaction #{transaction.id}
            </h2>



            <p className="mt-3">
              Type:
              <b>
                {" "}
                {transaction.transaction_type}
              </b>
            </p>



            <p>
              Amount:
              <b>
                {" "}
                ₹{transaction.amount}
              </b>
            </p>



            <p>
              Description:
              <b>
                {" "}
                {transaction.description}
              </b>
            </p>



            <p>
              Date:
              <b>
                {" "}
                {transaction.created_at}
              </b>
            </p>



          </div>


        ))

      }


      </div>


    </div>


    </div>


    </>

  );

}


export default WalletTransactions;