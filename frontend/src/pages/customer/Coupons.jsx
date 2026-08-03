import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


function Coupons(){


  const [coupons,setCoupons] = useState([]);



  useEffect(()=>{

    fetchCoupons();

  },[]);



  const fetchCoupons = async()=>{

    try{

      const response = await api.get(
        "/coupons/"
      );


      setCoupons(response.data);


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
      Offers & Coupons 🎟️
    </h1>



    <div className="grid grid-cols-3 gap-6">


    {
      coupons.map((coupon)=>(


        <div

          key={coupon.id}

          className="bg-white shadow rounded-xl p-6"

        >


          <h2 className="text-2xl font-bold">
            {coupon.code}
          </h2>



          <p className="mt-3">
            {coupon.description}
          </p>



          <p className="mt-3">
            Discount:
            <b>
              {" "}
              {coupon.discount_type}
            </b>
          </p>



          <p>
            Value:
            <b>
              {" "}
              {coupon.discount_value}
            </b>
          </p>



          <p>
            Minimum Order:
            <b>
              {" "}
              ₹{coupon.min_order_amount}
            </b>
          </p>



          {
            coupon.is_free_delivery &&

            <p className="text-green-600 font-bold mt-3">
              🚚 Free Delivery
            </p>

          }



          <button

            className="bg-orange-600 text-white px-4 py-2 rounded mt-5 w-full"

          >

            Apply Coupon 🎟️

          </button>



        </div>


      ))

    }


    </div>


    </div>


    </div>


    </>

  );

}


export default Coupons;