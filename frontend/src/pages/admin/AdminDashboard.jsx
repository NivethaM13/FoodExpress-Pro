import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";



function AdminDashboard(){


  const [dashboard,setDashboard] = useState(null);



  useEffect(()=>{

    fetchDashboard();

  },[]);




  const fetchDashboard = async()=>{

    try{

      const response = await api.get(
        "/admin/dashboard/"
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

      Loading Admin Dashboard...

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

👑 Admin Dashboard

</h1>







{/* Statistics Cards */}


<div className="
grid
grid-cols-3
gap-6
mb-10
">





<div className="
bg-white
rounded-2xl
shadow-xl
p-6
">


<h2 className="text-gray-500">

Total Customers

</h2>


<p className="
text-4xl
font-bold
text-blue-600
mt-3
">

{dashboard.total_customers}

</p>


</div>






<div className="
bg-white
rounded-2xl
shadow-xl
p-6
">


<h2 className="text-gray-500">

Total Restaurants

</h2>


<p className="
text-4xl
font-bold
text-orange-600
mt-3
">

{dashboard.total_restaurants}

</p>


</div>






<div className="
bg-white
rounded-2xl
shadow-xl
p-6
">


<h2 className="text-gray-500">

Delivery Partners

</h2>


<p className="
text-4xl
font-bold
text-green-600
mt-3
">

{dashboard.total_delivery_partners}

</p>


</div>



</div>





{/* Orders & Revenue */}


<div className="
grid
grid-cols-3
gap-6
mb-10
">



<div className="
bg-white
rounded-2xl
shadow-xl
p-6
">


<h2 className="text-gray-500">

Total Orders 📦

</h2>


<p className="
text-4xl
font-bold
mt-3
">

{dashboard.total_orders}

</p>


</div>





<div className="
bg-white
rounded-2xl
shadow-xl
p-6
">


<h2 className="text-gray-500">

Platform Revenue 💰

</h2>


<p className="
text-4xl
font-bold
text-purple-600
mt-3
">

₹ {dashboard.platform_revenue}

</p>


</div>





<div className="
bg-white
rounded-2xl
shadow-xl
p-6
">


<h2 className="text-gray-500">

Live Orders 🔴

</h2>


<p className="
text-4xl
font-bold
text-red-600
mt-3
">

{dashboard.live_orders}

</p>


</div>



</div>


{/* Platform Overview */}

<h2 className="
text-3xl
font-bold
mb-5
">

📊 Platform Overview

</h2>



<div className="
bg-white
rounded-2xl
shadow-xl
p-6
mb-10
">


<div className="
grid
grid-cols-3
gap-6
">


<div className="
bg-gray-100
rounded-xl
p-5
">


<h3 className="
font-bold
text-xl
">

👥 Users

</h3>


<p className="mt-2">

Active customers and platform users

</p>


</div>





<div className="
bg-gray-100
rounded-xl
p-5
">


<h3 className="
font-bold
text-xl
">

🍽️ Restaurants

</h3>


<p className="mt-2">

Registered food partners

</p>


</div>





<div className="
bg-gray-100
rounded-xl
p-5
">


<h3 className="
font-bold
text-xl
">

🚴 Delivery

</h3>


<p className="mt-2">

Delivery partner network

</p>


</div>


</div>


</div>








{/* Live Orders */}

<h2 className="
text-3xl
font-bold
mb-5
">

🔴 Live Orders

</h2>



<div className="
bg-white
rounded-2xl
shadow-xl
p-6
">


<div className="
flex
justify-between
items-center
">


<p className="
text-xl
font-bold
">

Current Active Orders

</p>



<span className="
bg-red-100
text-red-600
px-4
py-2
rounded-xl
font-bold
">

{dashboard.live_orders} Orders

</span>


</div>


</div>





</div>


</div>


</>


);


}


export default AdminDashboard;