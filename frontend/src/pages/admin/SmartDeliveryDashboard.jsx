import { useState } from "react";
import api from "../../services/api";


function SmartDeliveryDashboard() {


    const [orderId,setOrderId] = useState("");

    const [assignmentId,setAssignmentId] = useState("");

    const [result,setResult] = useState(null);





    const assignPartner = async()=>{


        try{


            const response = await api.post(

                `/delivery-assignment/assign/${orderId}`

            );


            setResult(response.data);


        }
        catch(error){

            console.log(error);

        }


    };






    const reassignPartner = async()=>{


        try{


            const response = await api.put(

                `/delivery-assignment/reassign/${assignmentId}`

            );


            setResult(response.data);


        }
        catch(error){

            console.log(error);

        }


    };






    return (

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">

                🚚 Smart Delivery Assignment

            </h1>





            <div className="grid md:grid-cols-2 gap-6">





                <div className="bg-white shadow rounded-xl p-6">


                    <h2 className="text-xl font-bold mb-4">

                        Auto Assign Delivery Partner

                    </h2>



                    <input

                    className="border p-3 w-full mb-4"

                    placeholder="Enter Order ID"

                    value={orderId}

                    onChange={
                        e=>setOrderId(e.target.value)
                    }

                    />



                    <button

                    onClick={assignPartner}

                    className="bg-blue-600 text-white px-5 py-2 rounded"

                    >

                        Assign Partner

                    </button>



                </div>








                <div className="bg-white shadow rounded-xl p-6">


                    <h2 className="text-xl font-bold mb-4">

                        Reassign Delivery Partner

                    </h2>




                    <input

                    className="border p-3 w-full mb-4"

                    placeholder="Assignment ID"

                    value={assignmentId}

                    onChange={
                        e=>setAssignmentId(e.target.value)
                    }

                    />




                    <button

                    onClick={reassignPartner}

                    className="bg-orange-600 text-white px-5 py-2 rounded"

                    >

                        Reassign

                    </button>



                </div>



            </div>








            {
                result &&

                <div className="bg-white shadow rounded-xl p-6 mt-8">


                    <h2 className="text-xl font-bold mb-4">

                        Assignment Result

                    </h2>



                    <pre>

                        {JSON.stringify(
                            result,
                            null,
                            2
                        )}

                    </pre>



                </div>

            }





        </div>

    );


}


export default SmartDeliveryDashboard;