import { useEffect, useState } from "react";
import axios from "axios";


function Home() {


const [restaurants, setRestaurants] = useState([]);



useEffect(() => {

fetchRestaurants();

}, []);




const fetchRestaurants = async () => {

try {


const token = localStorage.getItem("token");


const response = await axios.get(
"http://127.0.0.1:8000/restaurants/",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


setRestaurants(response.data);



}

catch(error){

console.log("Restaurant Fetch Error:", error);

}


};




return (

<div className="p-8">


<h1 className="text-4xl font-bold">

Welcome to FoodExpress Pro 🍔

</h1>



<p className="mt-4 text-gray-600">

Browse restaurants and order your favorite food.

</p>





<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">


{

restaurants.length === 0 ? (

<p className="text-gray-500">
No restaurants available
</p>


)

:

(

restaurants.map((restaurant)=>(


<div
key={restaurant.id}
className="
border
rounded-xl
p-6
shadow
bg-white
"
>



<h2 className="text-2xl font-bold">

{restaurant.name}

</h2>



<p className="mt-3 text-gray-600">

{restaurant.address}

</p>



<button
className="
mt-5
bg-orange-500
text-white
px-6
py-3
rounded-lg
hover:bg-orange-600
"
>


View Menu


</button>



</div>


))


)

}


</div>



</div>


);


}



export default Home;