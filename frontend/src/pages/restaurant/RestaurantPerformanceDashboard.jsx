import { useEffect, useState } from "react";
import api from "../../services/api";


function RestaurantPerformanceDashboard() {


    const [restaurantId,setRestaurantId] = useState("");

    const [performance,setPerformance] = useState(null);





    const getPerformance = async()=>{


        try{


            const response = await api.get(

                `/restaurant-performance/${restaurantId}`

            );


            setPerformance(response.data);


        }
        catch(error){

            console.log(error);

        }


    };






    return (

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">

                📊 Restaurant Performance Dashboard

            </h1>





            <div className="bg-white shadow rounded-xl p-6 mb-8">


                <h2 className="text-xl font-bold mb-4">

                    Search Restaurant Analytics

                </h2>



                <input

                className="border p-3 w-full mb-4"

                placeholder="Enter Restaurant ID"

                value={restaurantId}

                onChange={
                    e=>setRestaurantId(e.target.value)
                }

                />



                <button

                onClick={getPerformance}

                className="bg-orange-600 text-white px-6 py-3 rounded"

                >

                    View Performance

                </button>


            </div>









            {
                performance &&


                <div className="grid md:grid-cols-3 gap-6">



                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="font-bold text-lg">

                            💰 Daily Sales

                        </h2>

                        <p className="text-2xl mt-3">

                            ₹ {performance.daily_sales}

                        </p>

                    </div>





                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="font-bold text-lg">

                            📈 Weekly Revenue

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {performance.weekly_revenue}

                        </p>


                    </div>







                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="font-bold text-lg">

                            📅 Monthly Revenue

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {performance.monthly_revenue}

                        </p>


                    </div>






                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            🍽️ Popular Dish

                        </h2>


                        <p className="mt-3">

                            {performance.popular_dish}

                        </p>


                    </div>







                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            👥 Customer Growth

                        </h2>


                        <p className="text-2xl mt-3">

                            {performance.customer_growth}

                        </p>


                    </div>




                </div>

            }



        </div>

    );


}


export default RestaurantPerformanceDashboard;