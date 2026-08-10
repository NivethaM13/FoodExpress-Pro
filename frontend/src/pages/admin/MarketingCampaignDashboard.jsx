import { useEffect, useState } from "react";

import api from "../../services/api";


function MarketingCampaignDashboard(){


const [campaigns,setCampaigns] = useState([]);



const [form,setForm] = useState({

    title:"",
    campaign_type:"",
    message:"",
    target_audience:"",
    discount_percentage:0

});





useEffect(()=>{

    fetchCampaigns();

},[]);







const fetchCampaigns = async()=>{


try{


const response = await api.get(
"/marketing-campaigns/"
);


setCampaigns(response.data);


}
catch(error){

console.log(error);

}


};







const createCampaign = async()=>{


try{


await api.post(

"/marketing-campaigns/",

form

);



alert(
"Campaign Created Successfully"
);



setForm({

title:"",
campaign_type:"",
message:"",
target_audience:"",
discount_percentage:0

});



fetchCampaigns();



}
catch(error){

console.log(error);

}


};









const updateStatus = async(id,status)=>{


try{


await api.put(

`/marketing-campaigns/${id}`,

{

status:status

}

);



alert(
"Campaign Updated"
);



fetchCampaigns();



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

📢 Marketing Campaign Dashboard

</h1>








{/* Create Campaign */}



<div className="
bg-white
shadow
rounded-xl
p-6
max-w-xl
mb-10
">



<h2 className="
text-2xl
font-bold
mb-5
">

Create Campaign

</h2>







<input

className="
border
p-3
w-full
mb-3
rounded
"

placeholder="Campaign Title"

value={form.title}

onChange={
e=>setForm({

...form,

title:e.target.value

})

}

/>








<select

className="
border
p-3
w-full
mb-3
rounded
"

value={form.campaign_type}

onChange={
e=>setForm({

...form,

campaign_type:e.target.value

})

}

>


<option value="">
Select Campaign Type
</option>


<option value="PUSH_NOTIFICATION">
Push Notification
</option>


<option value="SMS">
SMS
</option>


<option value="EMAIL">
Email
</option>


<option value="PROMOTION">
Promotion
</option>


<option value="PERSONALIZED">
Personalized Marketing
</option>


</select>








<textarea

className="
border
p-3
w-full
mb-3
rounded
"

placeholder="Campaign Message"

value={form.message}

onChange={
e=>setForm({

...form,

message:e.target.value

})

}

/>








<input

className="
border
p-3
w-full
mb-3
rounded
"

placeholder="Target Audience"

value={form.target_audience}

onChange={
e=>setForm({

...form,

target_audience:e.target.value

})

}

/>








<input

type="number"

className="
border
p-3
w-full
mb-3
rounded
"

placeholder="Discount Percentage"

value={form.discount_percentage}

onChange={
e=>setForm({

...form,

discount_percentage:e.target.value

})

}

/>







<button

onClick={createCampaign}

className="
bg-orange-600
text-white
px-6
py-3
rounded-xl
"

>

Create Campaign

</button>





</div>









{/* Campaign List */}



<h2 className="
text-3xl
font-bold
mb-5
">

📋 Campaign List

</h2>








{

campaigns.map((campaign)=>(



<div

key={campaign.id}

className="
bg-white
shadow
rounded-xl
p-6
mb-5
"

>



<h3 className="
text-2xl
font-bold
">

{campaign.title}

</h3>




<p>

Type:

<b>
{" "}{campaign.campaign_type}
</b>

</p>




<p>

Message:

{campaign.message}

</p>




<p>

Audience:

{campaign.target_audience}

</p>




<p>

Discount:

{campaign.discount_percentage}%

</p>




<p>

Status:

<span className="
bg-green-100
px-3
py-1
rounded
ml-2
">

{campaign.status}

</span>

</p>







<select

className="
border
p-2
mt-4
rounded
"

onChange={
e=>updateStatus(
campaign.id,
e.target.value
)
}

>


<option value="">
Update Status
</option>


<option value="ACTIVE">
ACTIVE
</option>


<option value="INACTIVE">
INACTIVE
</option>


<option value="COMPLETED">
COMPLETED
</option>


</select>




</div>



))


}



</div>


);


}


export default MarketingCampaignDashboard;