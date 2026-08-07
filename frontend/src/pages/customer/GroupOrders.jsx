import { useEffect, useState } from "react";
import api from "../../services/api";

function GroupOrders() {

const [groups, setGroups] = useState([]);

const [createForm, setCreateForm] = useState({
    restaurant_id: "",
    title: ""
});

const [inviteCode, setInviteCode] = useState("");



useEffect(()=>{
    fetchGroups();
},[]);



const fetchGroups = async()=>{

try{

const response = await api.get(
    "/group-orders/"
);

setGroups(response.data);

}
catch(error){

console.log(error);

}

};




const createGroupOrder = async()=>{

try{

await api.post(
    "/group-orders/",
    createForm
);

alert("Group order created successfully");

setCreateForm({
    restaurant_id:"",
    title:""
});

fetchGroups();

}
catch(error){

console.log(error);

}

};





const joinGroup = async()=>{

try{

await api.post(
    "/group-orders/join",
    {
        invite_code:inviteCode
    }
);

alert("Joined group successfully");

setInviteCode("");

fetchGroups();

}
catch(error){

console.log(error);

}

};




return (

<div className="p-8">


<h1 className="text-4xl font-bold mb-8">
👥 Group Ordering System
</h1>



<div className="bg-white shadow rounded-xl p-6 mb-6">

<h2 className="text-2xl font-bold mb-4">
Create Group Order
</h2>


<input
className="border p-3 w-full mb-3 rounded"
placeholder="Restaurant ID"
value={createForm.restaurant_id}
onChange={(e)=>
setCreateForm({
...createForm,
restaurant_id:e.target.value
})
}
/>


<input
className="border p-3 w-full mb-3 rounded"
placeholder="Group Title"
value={createForm.title}
onChange={(e)=>
setCreateForm({
...createForm,
title:e.target.value
})
}
/>



<button
onClick={createGroupOrder}
className="bg-blue-600 text-white px-5 py-2 rounded"
>
Create Group
</button>


</div>





<div className="bg-white shadow rounded-xl p-6 mb-6">


<h2 className="text-2xl font-bold mb-4">
Join Group Order
</h2>


<input
className="border p-3 w-full mb-3 rounded"
placeholder="Enter Invite Code"
value={inviteCode}
onChange={(e)=>
setInviteCode(e.target.value)
}
/>



<button
onClick={joinGroup}
className="bg-green-600 text-white px-5 py-2 rounded"
>
Join Group
</button>


</div>





<h2 className="text-2xl font-bold mb-4">
My Group Orders
</h2>



<div className="space-y-4">


{
groups.map((group)=>(

<div
key={group.id}
className="bg-white shadow rounded-xl p-5"
>


<h3 className="text-xl font-bold">
{group.title}
</h3>


<p>
Restaurant ID: {group.restaurant_id}
</p>


<p>
Invite Code: {group.invite_code}
</p>


<p>
Status: {group.status}
</p>


<p>
Payment Status: {group.payment_status}
</p>


</div>

))
}


</div>


</div>

);

}


export default GroupOrders;