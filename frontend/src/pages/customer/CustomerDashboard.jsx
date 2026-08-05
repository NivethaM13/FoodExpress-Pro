import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

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


      setDashboard(response.data);


    }

    catch(error){

      console.log(error);

    }

  };






  if(!dashboard){

    return(

      <>

      <Navbar />

      <div className="p-10">

      Loading Customer Dashboard...

      </div>

      </>

    );

  }






return(

<>


<Navbar />



<div className="
flex
min-h-screen
bg-gray-100
">


<Sidebar />



<div className="
flex-1
p-8
">



<h1 className="
text-4xl
font-bold
mb-8
">

👤 Customer Dashboard

</h1>







{/* Wallet Card */}


<div className="
bg-white
rounded-2xl
shadow-xl
p-6
mb-8
">


<h2 className="
text-xl
font-bold
">

💰 Wallet Balance

</h2>


<p className="
text-4xl
font-bold
text-green-600
mt-3
">

₹ {dashboard.wallet_balance}

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
grid-cols-3
gap-6
mb-10
">



{

dashboard.recent_orders.map((order)=>(


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



<p className="mt-2">

Amount:

₹ {order.total_amount}

</p>



<p>

Status:

<b>

{" "}

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
mb-5
">

❤️ Favorite Restaurants

</h2>




<div className="
grid
grid-cols-3
gap-6
mb-10
">


{

dashboard.favorite_restaurants.map(

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


<p className="mt-2">

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
mb-5
">

📍 Saved Addresses

</h2>



<div className="
bg-white
rounded-2xl
shadow
p-6
mb-10
">


{

dashboard.saved_addresses.length > 0 ?


dashboard.saved_addresses.map(

(address,index)=>(


<p

key={index}

className="
bg-gray-100
p-4
rounded-xl
"

>

📍 {address}

</p>


)


)


:

<p className="text-gray-500">

No saved addresses

</p>


}


</div>








{/* Notifications */}


<h2 className="
text-3xl
font-bold
mb-5
">

🔔 Notifications

</h2>



<div className="
grid
grid-cols-2
gap-6
">


{

dashboard.notifications.map(

(notification)=>(


<div

key={notification.id}

className="
bg-white
rounded-2xl
shadow
p-6
"

>


<h3 className="
font-bold
text-xl
">

{notification.title}

</h3>



<p className="mt-2">

{notification.message}

</p>



</div>


)


)


}



</div>






</div>


</div>


</>


);


}


export default CustomerDashboard;