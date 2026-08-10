import { useEffect, useState } from "react";

import api from "../../services/api";


function SuperAdminControlCenter(){

const [controls,setControls] = useState([]);


useEffect(()=>{

fetchControls();

},[]);



const fetchControls = async()=>{

try{

const response = await api.get(
"/super-admin/"
);

setControls(response.data);

}
catch(error){

console.log(
"Super Admin Error:",
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

👑 Super Admin Control Center

</h1>



<div className="
grid
md:grid-cols-3
gap-6
">



<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
🏢 Manage Restaurants
</h2>

<p className="mt-3">
Control restaurant approvals and management
</p>

</div>



<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
👥 Manage Customers
</h2>

<p className="mt-3">
Customer account administration
</p>

</div>




<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
🚚 Delivery Partners
</h2>

<p className="mt-3">
Manage delivery partner operations
</p>

</div>




<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
⚙️ Platform Settings
</h2>

<p className="mt-3">
Configure platform settings
</p>

</div>




<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
🖥️ System Monitoring
</h2>

<p className="mt-3">
Monitor system activities
</p>

</div>




<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
✅ User Verification
</h2>

<p className="mt-3">
Verify platform users
</p>

</div>


</div>





<h2 className="
text-3xl
font-bold
mt-10
mb-5
">

📋 Admin Controls

</h2>



<div className="
grid
md:grid-cols-2
gap-6
">


{
controls.map((item)=>(


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

{item.control_type}

</h3>


<p>
Admin:
<b> {item.admin_name}</b>
</p>


<p>
Status:
<b> {item.status}</b>
</p>


<p>
Restaurants:
{item.manage_restaurants ? " ✅" : " ❌"}
</p>


<p>
Customers:
{item.manage_customers ? " ✅" : " ❌"}
</p>


<p>
Delivery:
{item.manage_delivery_partners ? " ✅" : " ❌"}
</p>


<p>
Monitoring:
{item.system_monitoring ? " ✅" : " ❌"}
</p>


</div>


))

}


</div>


</div>

);

}


export default SuperAdminControlCenter;