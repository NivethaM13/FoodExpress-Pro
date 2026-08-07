import { useState } from "react";
import api from "../../services/api";


function SmartInventoryDashboard() {


    const [restaurantId, setRestaurantId] = useState("");

    const [inventory, setInventory] = useState([]);

    const [loading, setLoading] = useState(false);





    const getInventory = async () => {


        if (!restaurantId) {

            alert("Please enter Restaurant ID");

            return;

        }



        try {


            setLoading(true);



            const response = await api.get(

                `/smart-inventory/${restaurantId}`

            );



            setInventory(response.data);



        }
        catch(error) {


            console.log(error);

            alert(
                "Unable to fetch inventory data"
            );


        }
        finally {


            setLoading(false);


        }


    };








    return (

        <div className="p-8">



            <h1 className="text-3xl font-bold mb-6">

                📦 Smart Inventory Dashboard

            </h1>







            <div className="bg-white shadow rounded-xl p-6 mb-8">


                <h2 className="text-xl font-bold mb-4">

                    Check Inventory

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

                    onClick={getInventory}

                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"

                >

                    {

                        loading

                        ?

                        "Loading..."

                        :

                        "View Inventory"

                    }


                </button>



            </div>









            {

                inventory.length > 0 &&


                <div className="overflow-x-auto">


                    <table className="w-full bg-white shadow rounded-xl">


                        <thead className="bg-gray-100">


                            <tr>


                                <th className="p-4 text-left">
                                    Ingredient
                                </th>


                                <th className="p-4 text-left">
                                    Stock
                                </th>


                                <th className="p-4 text-left">
                                    Minimum Stock
                                </th>


                                <th className="p-4 text-left">
                                    Status
                                </th>


                                <th className="p-4 text-left">
                                    Purchase Suggestion
                                </th>


                                <th className="p-4 text-left">
                                    Expiry
                                </th>


                            </tr>


                        </thead>







                        <tbody>


                            {

                                inventory.map((item)=>(


                                    <tr

                                    key={item.id}

                                    className="border-t"

                                    >



                                        <td className="p-4">

                                            {item.ingredient_name}

                                        </td>




                                        <td className="p-4">

                                            {item.current_stock}
                                            {" "}
                                            {item.unit}

                                        </td>





                                        <td className="p-4">

                                            {item.minimum_stock}

                                        </td>





                                        <td className="p-4">


                                            {

                                                item.low_stock_status === "LOW STOCK"

                                                ?

                                                <span className="text-red-600 font-bold">

                                                    ⚠️ LOW STOCK

                                                </span>


                                                :


                                                <span className="text-green-600 font-bold">

                                                    ✅ AVAILABLE

                                                </span>


                                            }


                                        </td>






                                        <td className="p-4">

                                            {item.purchase_suggestion}

                                        </td>






                                        <td className="p-4">

                                            {item.expiry_date || "N/A"}

                                            <br />

                                            {

                                                item.expiry_status === "SAFE"

                                                ?

                                                "✅ Safe"

                                                :

                                                "⚠️ Expired"

                                            }

                                        </td>





                                    </tr>


                                ))

                            }


                        </tbody>


                    </table>



                </div>


            }






            {

                inventory.length === 0 && !loading &&

                <div className="bg-white shadow rounded-xl p-6">


                    No inventory data available


                </div>

            }





        </div>

    );


}


export default SmartInventoryDashboard;