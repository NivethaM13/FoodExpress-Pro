import { useState } from "react";
import api from "../../services/api";


function FinancialDashboard() {


    const [restaurantId, setRestaurantId] = useState("");

    const [finance, setFinance] = useState(null);

    const [loading, setLoading] = useState(false);





    const getFinance = async () => {


        if (!restaurantId) {

            alert("Please enter Restaurant ID");

            return;

        }



        try {


            setLoading(true);



            const response = await api.get(

                `/restaurant-finance/${restaurantId}`

            );



            setFinance(response.data);



        }
        catch(error) {


            console.log(error);

            alert(
                "Unable to fetch financial report"
            );


        }
        finally {


            setLoading(false);


        }


    };






    return (

        <div className="p-8">



            <h1 className="text-3xl font-bold mb-6">

                💰 Restaurant Financial Dashboard

            </h1>







            <div className="bg-white shadow rounded-xl p-6 mb-8">


                <h2 className="text-xl font-bold mb-4">

                    View Financial Report

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

                    onClick={getFinance}

                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"

                >

                    {

                        loading

                        ?

                        "Loading..."

                        :

                        "View Report"

                    }


                </button>



            </div>









            {

                finance &&


                <div className="grid md:grid-cols-3 gap-6">





                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            💵 Total Revenue

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {finance.total_revenue}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            💸 Total Expense

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {finance.total_expense}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            📈 Profit Amount

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {finance.profit_amount}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            🧾 Tax Amount

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {finance.tax_amount}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            📅 Report Period

                        </h2>


                        <p className="mt-3">

                            {finance.report_period}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold text-lg">

                            ✅ Financial Status

                        </h2>


                        <p className="mt-3 text-green-600 font-bold">

                            {finance.financial_status}

                        </p>


                    </div>





                </div>

            }



        </div>

    );


}


export default FinancialDashboard;