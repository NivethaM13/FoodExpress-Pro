import { useState } from "react";
import api from "../../services/api";


function MembershipPlans() {


    const [customerId, setCustomerId] = useState("");

    const [membership, setMembership] = useState(null);





    const plans = [

        {
            name: "SILVER",
            price: 199,
            discount: "10%",
            delivery: "No Free Delivery",
            benefits: "Basic Discounts"
        },


        {
            name: "GOLD",
            price: 499,
            discount: "20%",
            delivery: "Free Delivery",
            benefits: "Exclusive Discounts"
        },


        {
            name: "PLATINUM",
            price: 999,
            discount: "30%",
            delivery: "Free Delivery",
            benefits: "Premium Offers + Priority Delivery"
        }

    ];







    const subscribe = async(plan)=>{


        try{


            await api.post(

                "/customer-membership/",

                {

                    customer_id:Number(customerId),

                    membership_type:plan.name,

                    membership_price:plan.price

                }

            );


            alert(
                `${plan.name} Membership Activated`
            );


            getMembership();


        }
        catch(error){


            console.log(error);


        }


    };







    const getMembership = async()=>{


        try{


            const response = await api.get(

                `/customer-membership/${customerId}`

            );


            setMembership(response.data);



        }
        catch(error){

            console.log(error);

        }


    };









    return (

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">

                👑 Customer Membership Plans

            </h1>





            <div className="bg-white shadow rounded-xl p-6 mb-8">


                <input

                    className="border p-3 w-full rounded mb-4"

                    placeholder="Enter Customer ID"

                    value={customerId}

                    onChange={
                        e=>setCustomerId(e.target.value)
                    }

                />



                <button

                    onClick={getMembership}

                    className="bg-blue-600 text-white px-6 py-3 rounded"

                >

                    View Membership

                </button>


            </div>








            <div className="grid md:grid-cols-3 gap-6">


                {

                    plans.map((plan)=>(


                        <div

                        key={plan.name}

                        className="bg-white shadow rounded-xl p-6"

                        >



                            <h2 className="text-2xl font-bold">

                                {plan.name}

                            </h2>



                            <p className="text-3xl mt-4">

                                ₹{plan.price}

                            </p>



                            <p className="mt-3">

                                🎁 Discount: {plan.discount}

                            </p>



                            <p>

                                🚚 {plan.delivery}

                            </p>



                            <p>

                                ⭐ {plan.benefits}

                            </p>




                            <button

                            onClick={()=>subscribe(plan)}

                            className="mt-5 bg-orange-500 text-white px-5 py-3 rounded"

                            >

                                Subscribe

                            </button>



                        </div>


                    ))

                }


            </div>









            {

                membership &&


                <div className="bg-white shadow rounded-xl p-6 mt-8">


                    <h2 className="text-xl font-bold">

                        Current Membership 👑

                    </h2>



                    <p className="mt-3">

                        Plan:
                        {" "}
                        {membership.membership_type}

                    </p>



                    <p>

                        Discount:
                        {" "}
                        {membership.discount_percentage}%

                    </p>



                    <p>

                        Free Delivery:
                        {" "}

                        {
                            membership.free_delivery
                            ?
                            "YES"
                            :
                            "NO"
                        }

                    </p>



                    <p>

                        Status:
                        {" "}
                        {membership.membership_status}

                    </p>



                </div>


            }



        </div>

    );


}


export default MembershipPlans;