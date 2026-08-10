import { useEffect, useState } from "react";

import api from "../../services/api";


function Complaints(){


const [complaints,setComplaints] = useState([]);



const [form,setForm] = useState({

    category:"",
    subject:"",
    description:""

});




useEffect(()=>{

    fetchComplaints();

},[]);





const fetchComplaints = async()=>{

    try{

        const response = await api.get(
            "/complaints/customer/1"
        );

        setComplaints(response.data);


    }
    catch(error){

        console.log(error);

    }

};







const raiseComplaint = async()=>{


    try{


        await api.post(
            "/complaints/",
            form
        );


        alert(
            "Complaint Raised Successfully"
        );



        setForm({

            category:"",
            subject:"",
            description:""

        });



        fetchComplaints();


    }
    catch(error){

        console.log(error);

    }


};






return(


<div className="p-8 bg-gray-100 min-h-screen">


<h1 className="text-4xl font-bold mb-8">

🎫 Customer Support

</h1>





<div className="
bg-white
shadow
rounded-xl
p-6
max-w-xl
">


<h2 className="
text-2xl
font-bold
mb-5
">

Raise Complaint

</h2>




<select

className="
border
p-3
w-full
mb-3
rounded
"

value={form.category}

onChange={
e=>setForm({

...form,

category:e.target.value

})
}

>

<option value="">
Select Category
</option>


<option value="ORDER ISSUE">
ORDER ISSUE
</option>


<option value="FOOD QUALITY">
FOOD QUALITY
</option>


<option value="PAYMENT ISSUE">
PAYMENT ISSUE
</option>


<option value="DELIVERY PROBLEM">
DELIVERY PROBLEM
</option>


<option value="ACCOUNT ISSUE">
ACCOUNT ISSUE
</option>


</select>






<input

className="
border
p-3
w-full
mb-3
rounded
"

placeholder="Subject"

value={form.subject}

onChange={
e=>setForm({

...form,

subject:e.target.value

})
}

/>






<textarea

className="
border
p-3
w-full
mb-3
rounded
"

placeholder="Describe your problem"

value={form.description}

onChange={
e=>setForm({

...form,

description:e.target.value

})
}

/>






<button

onClick={raiseComplaint}

className="
bg-orange-600
text-white
px-6
py-3
rounded-xl
"

>

Submit Complaint

</button>



</div>







<h2 className="
text-3xl
font-bold
mt-10
mb-5
">

📋 My Complaint Tickets

</h2>






{

complaints.map((item)=>(


<div

key={item.id}

className="
bg-white
shadow
rounded-xl
p-6
mb-4
"

>


<h3 className="text-xl font-bold">

Ticket #{item.id}

</h3>



<p>

Category:

<b> {item.category}</b>

</p>



<p>

Subject:

{item.subject}

</p>




<p>

Status:

<span className="
ml-2
bg-yellow-100
px-3
py-1
rounded
">

{item.status}

</span>

</p>




<p className="mt-3">

{item.description}

</p>



</div>


))


}



</div>


);


}


export default Complaints;