import { useEffect, useState } from "react";

import api from "../../services/api";


function AIRecommendationDashboard(){

const [recommendations,setRecommendations] = useState([]);



useEffect(()=>{

    fetchRecommendations();

},[]);



const fetchRecommendations = async()=>{

    try{

        const customerId = 1; // replace with logged-in customer id later


        const response = await api.get(
            `/ai-recommendations/customer/${customerId}`
        );


        setRecommendations(response.data);


    }
    catch(error){

        console.log(error);

    }

};





return (

<div className="
p-8
bg-gray-100
min-h-screen
">


<h1 className="
text-4xl
font-bold
mb-3
">

🤖 AI Customer Recommendation Dashboard

</h1>


<p className="
text-gray-600
mb-8
">

Smart food suggestions based on your taste 🍔

</p>





<div className="
grid
grid-cols-3
gap-6
">



{
recommendations.length === 0 && (

<div className="
bg-white
p-6
rounded-xl
shadow
">

No Recommendations Found

</div>

)

}



{
recommendations.map((item)=>(


<div
key={item.id}
className="
bg-white
rounded-2xl
shadow
p-6
hover:shadow-xl
transition
"
>


<h2 className="
text-xl
font-bold
">

🍽️ {item.food_name}

</h2>



<p className="mt-3">

Category:

<span className="font-bold">

{" "}{item.category}

</span>

</p>



<p>

Price:

<span className="font-bold">

₹ {item.price}

</span>

</p>




<p className="mt-3 text-gray-600">

{item.reason}

</p>




<span className="
inline-block
mt-4
bg-orange-100
text-orange-600
px-4
py-2
rounded-full
">

{item.recommendation_type}

</span>





<button

className="
mt-5
bg-orange-500
text-white
px-5
py-2
rounded-xl
hover:bg-orange-600
"

>

Add To Cart 🛒

</button>



</div>


))

}


</div>


</div>

);

}


export default AIRecommendationDashboard;