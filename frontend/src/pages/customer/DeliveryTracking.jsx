import { useState } from "react";
import api from "../../services/api";


function DeliveryTracking() {


    const [orderId,setOrderId] = useState("");

    const [tracking,setTracking] = useState(null);





    const trackDelivery = async()=>{


        try{


            const response = await api.get(

                `/delivery-tracking/${orderId}`

            );


            setTracking(response.data);


        }
        catch(error){

            console.log(error);

        }


    };







    const completeDelivery = async()=>{


        try{


            await api.put(

                `/delivery-tracking/${orderId}/complete`

            );


            alert(
                "Delivery completed successfully"
            );


            trackDelivery();


        }
        catch(error){

            console.log(error);

        }


    };







return (

<div className="p-8">


<h1 className="text-3xl font-bold mb-6">

📍 Live Delivery Tracking

</h1>





<div className="bg-white shadow rounded-xl p-6 mb-8">


<h2 className="text-xl font-bold mb-4">

Track Your Order

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

onClick={trackDelivery}

className="bg-blue-600 text-white px-6 py-3 rounded"

>

Track Delivery

</button>



</div>









{
tracking &&

<div className="grid md:grid-cols-2 gap-6">





<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">

🚴 Rider Location

</h2>



<p>

Location:

{tracking.current_location}

</p>



<p>

Latitude:

{tracking.latitude}

</p>



<p>

Longitude:

{tracking.longitude}

</p>



</div>









<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">

⏱️ Delivery Status

</h2>



<p>

ETA:

{tracking.eta_minutes} Minutes

</p>



<p>

Status:

{tracking.delivery_status}

</p>





<button

onClick={completeDelivery}

className="bg-green-600 text-white px-5 py-2 rounded mt-4"

>

Confirm Delivery

</button>



</div>





<div className="bg-white shadow rounded-xl p-6 md:col-span-2">


<h2 className="text-xl font-bold mb-4">

📦 Delivery Timeline

</h2>



<ul className="space-y-3">


<li>
✅ Order Confirmed
</li>


<li>
🚴 Rider Assigned
</li>


<li>
📍 Rider On The Way
</li>


<li>
🏠 Delivery Completion
</li>


</ul>


</div>




</div>

}



</div>

);


}


export default DeliveryTracking;