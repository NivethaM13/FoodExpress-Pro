import { useEffect, useState } from "react";
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

<div className="p-10 text-xl font-bold">

Loading Restaurant Dashboard...

</div>

);

}



return(

<div className="p-8 bg-gray-100 min-h-screen">


<h1 className="text-4xl font-bold mb-8">

🍔 Restaurant Dashboard

</h1>




{/* Summary Cards */}

<div className="grid grid-cols-3 gap-6 mb-10">


<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-bold">

Today's Orders

</h2>

<p className="text-3xl mt-3">

{dashboard.today_orders}

</p>

</div>




<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-bold">

Total Revenue

</h2>

<p className="text-3xl mt-3">

₹ {dashboard.total_revenue}

</p>

</div>




<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-bold">

Customer Rating ⭐

</h2>

<p className="text-3xl mt-3">

{dashboard.average_rating}

</p>

</div>


</div>





{/* Popular Food Items */}


<h2 className="text-2xl font-bold mb-5">

🔥 Popular Food Items

</h2>



<div className="grid grid-cols-3 gap-6">


{

dashboard.popular_foods.map((food,index)=>(


<div

key={index}

className="
bg-white
border
rounded-xl
p-5
shadow
"

>


<h3 className="text-xl font-bold">

{food.name}

</h3>


<p className="mt-3">

Popular Item 🔥

</p>


</div>


))


}


</div>






{/* Reviews */}


<div className="bg-white rounded-xl shadow p-6 mt-10">


<h2 className="text-2xl font-bold">

⭐ Customer Reviews

</h2>



<p className="mt-4">

Average Rating:

{" "}

{dashboard.average_rating}

</p>



<p>

Total Reviews:

{" "}

{dashboard.total_reviews}

</p>



</div>







{/* Sales Analytics */}


<div className="bg-white rounded-xl shadow p-6 mt-10">


<h2 className="text-2xl font-bold mb-5">

📈 Sales Analytics

</h2>



<p>

Orders

</p>


<div className="bg-gray-200 h-4 rounded-full">


<div

className="
bg-orange-500
h-4
rounded-full
"

style={{

width:`${dashboard.today_orders * 10}%`

}}

/>


</div>





<p className="mt-5">

Revenue

</p>


<div className="bg-gray-200 h-4 rounded-full">


<div

className="
bg-green-500
h-4
rounded-full
"

style={{

width:`${dashboard.total_revenue / 100}%`

}}

/>


</div>



</div>




</div>

);

}



export default RestaurantDashboard;