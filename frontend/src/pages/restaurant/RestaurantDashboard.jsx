import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";



function RestaurantDashboard(){


  const [dashboard,setDashboard] = useState(null);



  useEffect(()=>{

    fetchDashboard();

  },[]);




  const fetchDashboard = async()=>{


    try{


      const response = await api.get(

        "/restaurant/dashboard/"

      );


      setDashboard(response.data);


    }

    catch(error){

      console.log(error);

    }


  };





  if(!dashboard){

    return (

      <>

      <Navbar />

      <div className="p-10">

      Loading Dashboard...

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

🍔 Restaurant Dashboard

</h1>





{/* Summary Cards */}


<div className="
grid
grid-cols-3
gap-6
mb-8
">



<div className="
bg-white
shadow-xl
rounded-2xl
p-6
">


<h2 className="
text-gray-500
">

Today's Orders

</h2>


<p className="
text-4xl
font-bold
text-orange-600
">

{dashboard.today_orders}

</p>


</div>







<div className="
bg-white
shadow-xl
rounded-2xl
p-6
">


<h2 className="
text-gray-500
">

Total Revenue

</h2>


<p className="
text-4xl
font-bold
text-green-600
">

₹ {dashboard.total_revenue}

</p>


</div>






<div className="
bg-white
shadow-xl
rounded-2xl
p-6
">


<h2 className="
text-gray-500
">

Customer Rating ⭐

</h2>


<p className="
text-4xl
font-bold
text-yellow-500
">

{dashboard.average_rating}

</p>


</div>



</div>


{/* Popular Food Items */}

<div className="
bg-white
shadow-xl
rounded-2xl
p-6
mb-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

🔥 Popular Food Items

</h2>



<div className="
grid
grid-cols-3
gap-5
">


{

dashboard.popular_foods.map((food,index)=>(


<div

key={index}

className="
border
rounded-xl
p-5
"

>


<h3 className="
text-xl
font-bold
">

{food.name}

</h3>


<p className="
text-gray-600
mt-2
">

Popular Item

</p>


</div>


))


}



</div>


</div>








{/* Reviews Section */}


<div className="
grid
grid-cols-2
gap-6
">





<div className="
bg-white
shadow-xl
rounded-2xl
p-6
">


<h2 className="
text-2xl
font-bold
mb-4
">

⭐ Customer Reviews

</h2>



<p className="
text-5xl
font-bold
text-yellow-500
">

{dashboard.average_rating}

</p>



<p className="mt-3">

Total Reviews:

<b>

{" "}
{dashboard.total_reviews}

</b>

</p>


</div>








{/* Sales Analytics */}

<div className="
bg-white
shadow-xl
rounded-2xl
p-6
">


<h2 className="
text-2xl
font-bold
mb-4
">

📈 Sales Analytics

</h2>



<div className="
space-y-4
">


<div>

<p>

Orders

</p>


<div className="
bg-gray-200
rounded-full
h-4
">


<div

className="
bg-orange-500
h-4
rounded-full
"

style={{

width:
`${dashboard.today_orders * 10}%`

}}


/>


</div>


</div>






<div>


<p>

Revenue

</p>


<div className="
bg-gray-200
rounded-full
h-4
">


<div

className="
bg-green-500
h-4
rounded-full
"

style={{

width:
`${dashboard.total_revenue / 100}%`

}}


/>


</div>


</div>



</div>



</div>





</div>





</div>


</div>


</>


);


}


export default RestaurantDashboard;