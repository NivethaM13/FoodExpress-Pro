import { useState } from "react";
import api from "../../services/api";


function DeliveryEarningsDashboard() {


    const [partnerId, setPartnerId] = useState("");

    const [earnings, setEarnings] = useState([]);

    const [loading, setLoading] = useState(false);





    const getEarnings = async () => {


        if (!partnerId) {

            alert("Please enter Delivery Partner ID");

            return;

        }



        try {


            setLoading(true);



            const response = await api.get(

                `/delivery-earnings/${partnerId}`

            );



            setEarnings(response.data);



        }
        catch(error) {


            console.log(error);

            alert(
                "Unable to fetch earnings"
            );


        }
        finally {


            setLoading(false);


        }


    };







    const latest = earnings[0];






    return (

        <div className="p-8">



            <h1 className="text-3xl font-bold mb-6">

                🚴 Delivery Partner Earnings Dashboard

            </h1>








            <div className="bg-white shadow rounded-xl p-6 mb-8">


                <h2 className="text-xl font-bold mb-4">

                    View Earnings

                </h2>




                <input

                    className="border p-3 w-full mb-4 rounded"

                    placeholder="Enter Delivery Partner ID"

                    value={partnerId}

                    onChange={
                        e => setPartnerId(e.target.value)
                    }

                />





                <button

                    onClick={getEarnings}

                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"

                >

                    {

                        loading

                        ?

                        "Loading..."

                        :

                        "View Earnings"

                    }


                </button>



            </div>









            {

                latest &&


                <div className="grid md:grid-cols-3 gap-6 mb-8">





                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold">

                            💵 Daily Earnings

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {latest.daily_earnings}

                        </p>


                    </div>







                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold">

                            📅 Weekly Earnings

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {latest.weekly_earnings}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold">

                            🎁 Incentive

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {latest.incentive_amount}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold">

                            🏆 Bonus

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {latest.bonus_amount}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold">

                            💰 Total Payment

                        </h2>


                        <p className="text-2xl mt-3">

                            ₹ {latest.total_payment}

                        </p>


                    </div>








                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="font-bold">

                            ✅ Payment Status

                        </h2>


                        <p className="mt-3 text-green-600 font-bold">

                            {latest.payment_status}

                        </p>


                    </div>



                </div>


            }









            {

                earnings.length > 0 &&


                <div className="bg-white shadow rounded-xl p-6">


                    <h2 className="text-xl font-bold mb-4">

                        Payment History

                    </h2>





                    <table className="w-full">


                        <thead className="bg-gray-100">


                            <tr>

                                <th className="p-3">
                                    Date
                                </th>


                                <th className="p-3">
                                    Daily
                                </th>


                                <th className="p-3">
                                    Bonus
                                </th>


                                <th className="p-3">
                                    Total
                                </th>


                                <th className="p-3">
                                    Status
                                </th>


                            </tr>


                        </thead>





                        <tbody>


                            {

                                earnings.map((item)=>(


                                    <tr

                                    key={item.id}

                                    className="border-t"

                                    >


                                        <td className="p-3">

                                            {
                                                item.created_at
                                            }

                                        </td>


                                        <td className="p-3">

                                            ₹ {item.daily_earnings}

                                        </td>


                                        <td className="p-3">

                                            ₹ {item.bonus_amount}

                                        </td>


                                        <td className="p-3">

                                            ₹ {item.total_payment}

                                        </td>


                                        <td className="p-3">

                                            {item.payment_status}

                                        </td>


                                    </tr>


                                ))

                            }


                        </tbody>


                    </table>


                </div>


            }



        </div>

    );


}


export default DeliveryEarningsDashboard;