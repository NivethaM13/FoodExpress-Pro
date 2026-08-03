import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


function RestaurantReviews(){


  const [reviews,setReviews] = useState([]);


  const restaurantId = 3;



  useEffect(()=>{

    fetchReviews();

  },[]);



  const fetchReviews = async()=>{

    try{

      const response = await api.get(
        `/reviews/${restaurantId}`
      );


      setReviews(response.data);


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
      Restaurant Reviews ⭐
    </h1>



    <div className="grid grid-cols-3 gap-6">


    {
      reviews.map((review)=>(


        <div

          key={review.id}

          className="bg-white shadow rounded-xl p-6"

        >


          <h2 className="text-xl font-bold">
            Customer Review ⭐
          </h2>



          <p className="mt-3">
            Restaurant Rating:
            ⭐ {review.restaurant_rating}
          </p>



          <p>
            Food Rating:
            🍔 {review.food_rating}
          </p>



          <p>
            Delivery Rating:
            🚴 {review.delivery_rating}
          </p>



          <p className="mt-4">
            Feedback:
          </p>


          <p className="italic">
            "{review.comment}"
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


export default RestaurantReviews;