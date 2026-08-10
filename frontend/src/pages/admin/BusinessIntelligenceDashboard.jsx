import { useEffect, useState } from "react";

import api from "../../services/api";


function BusinessIntelligenceDashboard(){

const [analytics,setAnalytics] = useState([]);


useEffect(()=>{

fetchAnalytics();

},[]);



const fetchAnalytics = async()=>{

try{

const response = await api.get(
"/business-intelligence/"
);

setAnalytics(response.data);

}
catch(error){

console.log(
"Business Intelligence Error:",
error
);

}

};



return(

<div className="p-8">


<h1 className="
text-4xl
font-bold
mb-8
">

📊 Business Intelligence Dashboard

</h1>



<div className="
grid
md:grid-cols-5
gap-6
">


<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="font-bold">
Customers
</h2>

<p className="
text-3xl
text-blue-600
mt-3
">

{
analytics.reduce(
(sum,item)=>
sum+(item.total_customers || 0),
0
)
}

</p>

</div>



<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="font-bold">
Restaurants
</h2>

<p className="
text-3xl
text-green-600
mt-3
">

{
analytics.reduce(
(sum,item)=>
sum+(item.total_restaurants || 0),
0
)
}

</p>

</div>




<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="font-bold">
Deliveries
</h2>

<p className="
text-3xl
text-purple-600
mt-3
">

{
analytics.reduce(
(sum,item)=>
sum+(item.total_deliveries || 0),
0
)
}

</p>

</div>




<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="font-bold">
Revenue
</h2>

<p className="
text-3xl
text-yellow-600
mt-3
">

₹
{
analytics.reduce(
(sum,item)=>
sum+(item.total_revenue || 0),
0
)
}

</p>

</div>




<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="font-bold">
Forecast
</h2>

<p className="
text-3xl
text-red-600
mt-3
">

₹
{
analytics.reduce(
(sum,item)=>
sum+(item.revenue_forecast || 0),
0
)
}

</p>

</div>


</div>





<h2 className="
text-3xl
font-bold
mt-10
mb-5
">

📋 Analytics Reports

</h2>



<div className="
grid
md:grid-cols-3
gap-6
">


{
analytics.map((item)=>(


<div
key={item.id}
className="
bg-white
shadow
rounded-2xl
p-6
"
>


<h3 className="
text-xl
font-bold
">

{item.metric_type}

</h3>



<p className="mt-3">

Customers:
<b>
{" "}
{item.total_customers}
</b>

</p>



<p>

Retention:
<b>
{" "}
{item.customer_retention_rate}%
</b>

</p>



<p>

Restaurant Growth:
<b>
{" "}
{item.restaurant_growth_rate}%
</b>

</p>



<p>

Delivery Success:
<b>
{" "}
{item.delivery_success_rate}%
</b>

</p>



<p>

Revenue:
<b>
₹ {item.total_revenue}
</b>

</p>



<p>

Forecast:
<b>
₹ {item.revenue_forecast}
</b>

</p>



</div>


))

}


</div>


</div>

);

}


export default BusinessIntelligenceDashboard;