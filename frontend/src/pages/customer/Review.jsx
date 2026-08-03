import { useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


function Review(){


  const [form,setForm] = useState({

    restaurant_id:3,

    order_id:1,

    restaurant_rating:5,

    food_rating:5,

    delivery_rating:5,

    comment:""

  });



  const handleChange=(e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };



  const submitReview=async()=>{


    try{


      await api.post(
        "/reviews/",
        {
          ...form,

          restaurant_rating:Number(form.restaurant_rating),

          food_rating:Number(form.food_rating),

          delivery_rating:Number(form.delivery_rating)

        }
      );


      alert(
        "Review Submitted ⭐"
      );


    }catch(error){

      console.log(error);

      alert(
        "Review Failed"
      );

    }


  };



  return(

    <>

    <Navbar />


    <div className="flex">


    <Sidebar />


    <div className="flex-1 p-8">


    <h1 className="text-4xl font-bold mb-8">
      Give Your Review ⭐
    </h1>



    <div className="bg-white shadow rounded-xl p-6 max-w-xl">


    <label>
      Restaurant Rating ⭐
    </label>

    <input

      name="restaurant_rating"

      value={form.restaurant_rating}

      onChange={handleChange}

      className="border p-3 rounded w-full mb-4"

    />



    <label>
      Food Rating 🍔
    </label>

    <input

      name="food_rating"

      value={form.food_rating}

      onChange={handleChange}

      className="border p-3 rounded w-full mb-4"

    />



    <label>
      Delivery Rating 🚴
    </label>

    <input

      name="delivery_rating"

      value={form.delivery_rating}

      onChange={handleChange}

      className="border p-3 rounded w-full mb-4"

    />



    <textarea

      name="comment"

      placeholder="Write your feedback"

      value={form.comment}

      onChange={handleChange}

      className="border p-3 rounded w-full"

    />



    <button

      onClick={submitReview}

      className="bg-orange-600 text-white px-5 py-3 rounded mt-5 w-full"

    >

      Submit Review ⭐

    </button>



    </div>


    </div>


    </div>


    </>

  );

}


export default Review;