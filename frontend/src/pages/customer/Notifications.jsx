import { useEffect, useState } from "react";

import api from "../../services/api";


function Notifications() {


const [notifications, setNotifications] = useState([]);



useEffect(()=>{

fetchNotifications();

},[]);




const fetchNotifications = async()=>{

try{

const response = await api.get(
"/notifications/"
);


setNotifications(response.data);


}

catch(error){

console.log(error);

}

};





const markRead = async(id)=>{


try{


await api.put(
`/notifications/${id}/read`
);


fetchNotifications();


}

catch(error){

console.log(error);

}


};





const getIcon = (type)=>{


switch(type){


case "ORDER_CONFIRMATION":
return "✅";


case "ORDER_ACCEPTED":
return "🏪";


case "FOOD_PREPARATION":
return "👨‍🍳";


case "OUT_FOR_DELIVERY":
return "🛵";


case "DELIVERED":
return "🎁";


case "PROMOTION":
return "🔥";


default:
return "🔔";


}


};






return(


<div className="p-8">



<div className="flex justify-between items-center mb-8">


<div>


<h1 className="text-4xl font-bold">
Notifications 🔔
</h1>


<p className="text-gray-500 mt-2">
Stay updated with your order and account activity.
</p>


</div>




<button

className="
border-2
border-orange-500
text-orange-500
px-6
py-3
rounded-xl
hover:bg-orange-500
hover:text-white
"

>

✓ Mark all as read

</button>



</div>







<div className="space-y-5">



{

notifications.map((item)=>(


<div

key={item.id}

className="
bg-white
rounded-2xl
shadow-md
p-6
flex
items-center
justify-between
border-l-4
border-orange-400
"

>



<div className="flex gap-5">


<div

className="
w-16
h-16
rounded-full
bg-orange-100
flex
items-center
justify-center
text-3xl
"

>

{getIcon(item.notification_type)}


</div>





<div>


<h2 className="text-xl font-bold">


{item.title}



{

!item.is_read &&

<span

className="
ml-3
bg-red-100
text-red-600
px-3
py-1
rounded-full
text-sm
"

>

NEW

</span>

}


</h2>





<p className="text-gray-600 mt-2">

{item.message}

</p>




<p className="mt-3 text-sm">


Type:


<span

className="
ml-2
bg-orange-100
text-orange-600
px-3
py-1
rounded-full
"

>

{item.notification_type}

</span>


</p>




</div>



</div>







{

!item.is_read &&


<button

onClick={()=>markRead(item.id)}

className="
border
border-orange-500
text-orange-500
px-5
py-2
rounded-xl
hover:bg-orange-500
hover:text-white
"

>

✓ Mark as Read

</button>


}



</div>



))


}



</div>



</div>


);


}


export default Notifications;