import { useEffect, useState } from "react";

import api from "../../services/api";


function CustomerSupportDashboard(){


const [complaints,setComplaints] = useState([]);



const [updateData,setUpdateData] = useState({

status:"",
resolution_note:""

});





useEffect(()=>{

fetchComplaints();

},[]);






const fetchComplaints = async()=>{


try{


const response = await api.get(
"/complaints/"
);


setComplaints(response.data);



}
catch(error){

console.log(error);

}


};







const updateComplaint = async(id)=>{


try{


await api.put(

`/complaints/${id}`,

updateData

);



alert(
"Complaint Updated Successfully"
);



setUpdateData({

status:"",
resolution_note:""

});



fetchComplaints();



}
catch(error){

console.log(error);

}


};








return(


<div className="p-8 bg-gray-100 min-h-screen">


<h1 className="
text-4xl
font-bold
mb-8
">

🎫 Customer Support Dashboard

</h1>






{

complaints.map((item)=>(


<div

key={item.id}

className="
bg-white
rounded-xl
shadow
p-6
mb-5
"

>


<h2 className="
text-2xl
font-bold
">

Ticket #{item.id}

</h2>



<p className="mt-3">

Customer ID:

<b>
{" "}{item.customer_id}
</b>

</p>




<p>

Category:

<b>
{" "}{item.category}
</b>

</p>




<p>

Subject:

{item.subject}

</p>




<p>

Description:

{item.description}

</p>




<p className="mt-3">

Current Status:

<span className="
bg-yellow-100
px-3
py-1
rounded
ml-2
">

{item.status}

</span>

</p>





<select

className="
border
p-2
mt-4
rounded
"

value={updateData.status}

onChange={
e=>setUpdateData({

...updateData,

status:e.target.value

})

}

>


<option value="">
Update Status
</option>


<option value="OPEN">
OPEN
</option>


<option value="IN_PROGRESS">
IN_PROGRESS
</option>


<option value="RESOLVED">
RESOLVED
</option>


<option value="CLOSED">
CLOSED
</option>


</select>






<textarea

className="
border
p-3
w-full
mt-3
rounded
"

placeholder="Resolution Note"

value={updateData.resolution_note}

onChange={
e=>setUpdateData({

...updateData,

resolution_note:e.target.value

})

}

/>







<button

onClick={()=>updateComplaint(item.id)}

className="
bg-green-600
text-white
px-6
py-3
rounded-xl
mt-3
"

>

Update Complaint

</button>




</div>


))


}



</div>


);


}


export default CustomerSupportDashboard;