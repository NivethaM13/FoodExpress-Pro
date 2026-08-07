import { useState } from "react";
import api from "../../services/api";


function GroupPayment() {


    const [form,setForm] = useState({

        group_order_id:"",

        payment_method:"UPI"

    });



    const [message,setMessage] = useState("");



    const payGroupOrder = async()=>{


        try{


            const response = await api.post(
                `/group-payments/?group_order_id=${form.group_order_id}&payment_method=${form.payment_method}`
            );


            setMessage(
                `Payment Successful ₹${response.data.amount}`
            );


        }
        catch(error){

            console.log(error);

            setMessage(
                "Payment failed"
            );

        }


    };





    return (

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">

                💳 Group Payment

            </h1>





            <div className="bg-white shadow rounded-xl p-6 max-w-xl">


                <label className="font-bold">

                    Group Order ID

                </label>


                <input

                className="border p-3 w-full mt-2 mb-4"

                placeholder="Enter Group Order ID"

                value={form.group_order_id}

                onChange={
                    e=>setForm({

                        ...form,

                        group_order_id:e.target.value

                    })
                }

                />





                <label className="font-bold">

                    Payment Method

                </label>



                <select

                className="border p-3 w-full mt-2 mb-4"

                value={form.payment_method}

                onChange={
                    e=>setForm({

                        ...form,

                        payment_method:e.target.value

                    })
                }

                >


                    <option value="UPI">
                        UPI
                    </option>


                    <option value="CARD">
                        Card
                    </option>


                    <option value="COD">
                        Cash On Delivery
                    </option>


                </select>





                <button

                onClick={payGroupOrder}

                className="bg-green-600 text-white px-6 py-3 rounded"

                >

                    Pay Now

                </button>




                {
                    message &&

                    <p className="mt-5 text-lg font-bold">

                        {message}

                    </p>

                }



            </div>


        </div>

    );

}


export default GroupPayment;