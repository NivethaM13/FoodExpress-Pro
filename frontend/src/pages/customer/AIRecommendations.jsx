import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


function AIRecommendations(){


  const [trending,setTrending] = useState([]);

  const [recommended,setRecommended] = useState([]);

  const [cuisineFoods,setCuisineFoods] = useState([]);

  const [mealFoods,setMealFoods] = useState([]);

  const [search,setSearch] = useState("");





  useEffect(()=>{

    fetchTrending();

    fetchRecommended();

  },[]);







  // 🔥 Trending Foods

  const fetchTrending = async()=>{

    try{

      const response = await api.get(
        "/recommendations/trending"
      );


      setTrending(response.data);


    }
    catch(error){

      console.log(error);

    }

  };








  // 👤 Personalized Recommendation

  const fetchRecommended = async()=>{

    try{

      const response = await api.get(
        "/recommendations/personalized"
      );


      setRecommended(response.data);


    }
    catch(error){

      console.log(error);

    }

  };







  // 🌎 Cuisine Suggestion

  const fetchCuisine = async(cuisine)=>{


    try{


      const response = await api.get(

        `/recommendations/cuisine/${cuisine}`

      );


      setCuisineFoods(
        response.data
      );


    }
    catch(error){

      console.log(error);

    }


  };








  // 🍽️ Meal Recommendation

  const fetchMeal = async(type)=>{


    try{


      const response = await api.get(

        `/recommendations/meal/${type}`

      );


      setMealFoods(
        response.data
      );


    }
    catch(error){

      console.log(error);

    }


  };







  // 🔍 Smart Search

  const filteredFoods = recommended.filter(

    item =>

    item.name?.toLowerCase()
    .includes(
      search.toLowerCase()
    )

  );







  return(

    <>


    <Navbar />



    <div className="
    flex
    min-h-screen
    bg-gray-100
    ">



    <Sidebar />



    <div className="
    flex-1
    p-8
    ">



    <h1 className="
    text-4xl
    font-bold
    mb-6
    ">

    🤖 AI Food Recommendations

    </h1>



    <p className="
    text-gray-600
    mb-8
    ">

    Smart suggestions based on your taste 🍔

    </p>





    {/* Smart Search */}


    <input


    value={search}


    onChange={
      (e)=>setSearch(e.target.value)
    }


    placeholder="
    Search your favorite food 🔍
    "


    className="
    w-full
    border
    rounded-xl
    px-5
    py-3
    mb-6
    "


    />





    {/* Cuisine Buttons */}


    <div className="
    flex
    gap-4
    mb-10
    ">


    <button

    onClick={
      ()=>fetchCuisine("Indian")
    }

    className="
    bg-orange-500
    text-white
    px-5
    py-2
    rounded-xl
    "

    >

    🍛 Indian

    </button>




    <button

    onClick={
      ()=>fetchCuisine("Chinese")
    }

    className="
    bg-orange-500
    text-white
    px-5
    py-2
    rounded-xl
    "

    >

    🥡 Chinese

    </button>




    <button

    onClick={
      ()=>fetchMeal("Dinner")
    }

    className="
    bg-orange-500
    text-white
    px-5
    py-2
    rounded-xl
    "

    >

    🍽️ Dinner

    </button>


    </div>





    {/* Trending Foods */}


    <h2 className="
    text-2xl
    font-bold
    mb-4
    ">

    🔥 Trending Foods

    </h2>



    <div className="
    grid
    grid-cols-3
    gap-6
    ">


    {
      trending.map((food)=>(


        <div

        key={food.id}

        className="
        bg-white
        rounded-xl
        shadow
        p-5
        "

        >


        <h3 className="
        text-xl
        font-bold
        ">

        {food.name}

        </h3>



        <p className="mt-2">

        ₹ {food.price}

        </p>



        </div>


      ))
    }


    </div>


        {/* Recommended For You */}


    <h2 className="
    text-2xl
    font-bold
    mt-10
    mb-4
    ">

    👤 Recommended For You

    </h2>




    <div className="
    grid
    grid-cols-3
    gap-6
    ">


    {
      filteredFoods.map((food)=>(


        <div

        key={food.id}

        className="
        bg-white
        rounded-xl
        shadow
        p-5
        "

        >


        <h3 className="
        text-xl
        font-bold
        ">

        {food.name}

        </h3>



        <p className="mt-2">

        ₹ {food.price}

        </p>




        <button

        className="
        bg-orange-500
        text-white
        px-4
        py-2
        rounded-lg
        mt-4
        "

        >

        Add To Cart 🛒

        </button>



        </div>


      ))
    }


    </div>








    {/* Cuisine Suggestions */}



    <h2 className="
    text-2xl
    font-bold
    mt-10
    mb-4
    ">

    🌎 Cuisine Suggestions

    </h2>




    <div className="
    grid
    grid-cols-3
    gap-6
    ">


    {
      cuisineFoods.map((food)=>(


        <div

        key={food.id}

        className="
        bg-white
        rounded-xl
        shadow
        p-5
        "

        >


        <h3 className="
        text-xl
        font-bold
        ">

        {food.name}

        </h3>



        <p>

        ₹ {food.price}

        </p>



        </div>


      ))
    }


    </div>








    {/* Meal Recommendations */}



    <h2 className="
    text-2xl
    font-bold
    mt-10
    mb-4
    ">

    🍽️ Meal Recommendations

    </h2>




    <div className="
    grid
    grid-cols-3
    gap-6
    ">


    {
      mealFoods.map((food)=>(


        <div

        key={food.id}

        className="
        bg-white
        rounded-xl
        shadow
        p-5
        "

        >


        <h3 className="
        text-xl
        font-bold
        ">

        {food.name}

        </h3>



        <p>

        ₹ {food.price}

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


export default AIRecommendations;