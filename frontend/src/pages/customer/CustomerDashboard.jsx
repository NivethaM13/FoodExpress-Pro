import { useEffect, useState } from "react";

import api from "../../services/api";


function CustomerDashboard(){

const [dashboard,setDashboard] = useState(null);



useEffect(()=>{

    fetchDashboard();

},[]);





const fetchDashboard = async()=>{


    try{


        const response = await api.get(
            "/customer/dashboard/"
        );


        console.log(
            "Customer Dashboard Data:",
            response.data
        );


        setDashboard(response.data);


    }
    catch(error){


        console.log(
            "Customer Dashboard Error:",
            error.response?.data || error
        );


    }


};





if(!dashboard){


return(

<div className="p-10 text-xl">

Loading Customer Dashboard...

</div>

);


}






return(


<div className="p-8 bg-gray-100 min-h-screen">





<h1 className="
text-5xl
font-bold
mb-8
">

👤 Customer Dashboard

</h1>






{/* Wallet */}



<div className="
bg-white
rounded-2xl
shadow
p-8
mb-8
">


<h2 className="
text-2xl
font-bold
">

💰 Wallet Balance

</h2>


<p className="
text-green-600
text-4xl
mt-4
">

₹ {dashboard.wallet_balance || 0}

</p>


</div>








{/* Recent Orders */}



<h2 className="
text-3xl
font-bold
mb-5
">

📦 Recent Orders

</h2>



<div className="
grid
md:grid-cols-3
gap-6
">



{

dashboard.recent_orders?.map((order)=>(


<div
key={order.id}
className="
bg-white
rounded-2xl
shadow
p-6
"
>


<h3 className="
text-xl
font-bold
">

Order #{order.id}

</h3>


<p className="mt-3">

Amount:

<b>
₹ {order.total_amount}
</b>

</p>


<p>

Status:

<b>
{order.order_status}
</b>

</p>



</div>


))


}



</div>









{/* Favorite Restaurants */}



<h2 className="
text-3xl
font-bold
mt-10
mb-5
">

❤️ Favorite Restaurants

</h2>




<div className="
grid
md:grid-cols-3
gap-6
">



{

dashboard.favorite_restaurants?.map(
(restaurant,index)=>(


<div
key={index}
className="
bg-white
rounded-2xl
shadow
p-6
"
>


<h3 className="
text-xl
font-bold
">

{restaurant}

</h3>


<p>

⭐ Popular Restaurant

</p>



</div>


)

)


}



</div>









{/* Saved Addresses */}



<h2 className="
text-3xl
font-bold
mt-10
mb-5
">

📍 Saved Addresses

</h2>




{

dashboard.saved_addresses?.length > 0 ?


dashboard.saved_addresses.map(
(address,index)=>(


<div
key={index}
className="
bg-white
shadow
rounded-xl
p-4
mb-3
"
>

📍 {address}


</div>


))


:

<p>

No saved addresses

</p>


}









{/* Notifications */}




<h2 className="
text-3xl
font-bold
mt-10
mb-5
">

🔔 Notifications

</h2>




{

dashboard.notifications?.map(
(notification)=>(


<div
key={notification.id}
className="
bg-white
shadow
rounded-xl
p-6
mb-4
"
>


<h3 className="
font-bold
text-xl
">

{notification.title}

</h3>


<p>

{notification.message}

</p>



</div>


))


}







</div>


);


}



export default CustomerDashboard;