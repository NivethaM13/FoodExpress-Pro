import { useState } from "react";
import api from "../../services/api";


function AIDemandDashboard() {


    const [restaurantId, setRestaurantId] = useState("");

    const [prediction, setPrediction] = useState(null);

    const [loading, setLoading] = useState(false);





    const getPrediction = async () => {


        if (!restaurantId) {

            alert("Please enter Restaurant ID");

            return;

        }



        try {


            setLoading(true);



            const response = await api.get(

                `/ai-demand-prediction/${restaurantId}`

            );



            setPrediction(response.data);



        }
        catch(error) {


            console.log(error);


            alert(
                "Unable to fetch AI prediction"
            );


        }
        finally {


            setLoading(false);


        }


    };






    return (

        <div className="p-8">



            <h1 className="text-3xl font-bold mb-6">

                🤖 AI Demand Prediction Dashboard

            </h1>






            <div className="bg-white shadow rounded-xl p-6 mb-8">


                <h2 className="text-xl font-bold mb-4">

                    View Demand Forecast

                </h2>





                <input


                    className="border p-3 w-full mb-4 rounded"


                    placeholder="Enter Restaurant ID"


                    value={restaurantId}


                    onChange={
                        e => setRestaurantId(e.target.value)
                    }


                />






                <button


                    onClick={getPrediction}


                    className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"


                >


                    {

                        loading

                        ?

                        "Generating..."

                        :

                        "Generate Prediction"

                    }


                </button>



            </div>









            {

                prediction &&


                <div className="grid md:grid-cols-3 gap-6">





                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            ⏰ Peak Hour

                        </h2>


                        <p className="mt-3 text-gray-700">

                            {prediction.peak_hour || "N/A"}

                        </p>


                    </div>







                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            📈 Demand Level

                        </h2>


                        <p className="mt-3 text-gray-700">

                            {prediction.demand_level}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            🛒 Predicted Orders

                        </h2>


                        <p className="text-2xl mt-3">

                            {prediction.predicted_orders}

                        </p>


                    </div>









                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            🍽️ Popular Food Forecast

                        </h2>


                        <p className="mt-3 text-gray-700">

                            {prediction.popular_food || "N/A"}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            📦 Inventory Suggestion

                        </h2>


                        <p className="mt-3 text-gray-700">

                            {prediction.inventory_suggestion || "N/A"}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            🌦️ Seasonal Trend

                        </h2>


                        <p className="mt-3 text-gray-700">

                            {prediction.seasonal_trend || "N/A"}

                        </p>


                    </div>





                </div>

            }



        </div>

    );


}


export default AIDemandDashboard;