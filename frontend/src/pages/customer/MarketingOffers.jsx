import { useEffect, useState } from "react";

import api from "../../services/api";


function MarketingOffers(){


const [offers,setOffers] = useState([]);




useEffect(()=>{

    fetchOffers();

},[]);





const fetchOffers = async()=>{


try{


const response = await api.get(
"/marketing-campaigns/active"
);


setOffers(response.data);



}
catch(error){

console.log(error);

}


};







return(


<div className="
p-8
bg-gray-100
min-h-screen
">



<h1 className="
text-4xl
font-bold
mb-8
">

🔥 Personalized Offers & Promotions

</h1>






{

offers.length === 0 &&

<p className="text-xl">

No active offers available

</p>

}







<div className="
grid
md:grid-cols-3
gap-6
">





{

offers.map((offer)=>(


<div

key={offer.id}

className="
bg-white
rounded-2xl
shadow
p-6
"

>



<div className="
text-4xl
mb-4
">

📢

</div>





<h2 className="
text-2xl
font-bold
">

{offer.title}

</h2>






<p className="
mt-3
text-gray-600
">

{offer.message}

</p>







<p className="mt-4">

Type:

<span className="
ml-2
bg-orange-100
text-orange-600
px-3
py-1
rounded-full
">

{offer.campaign_type}

</span>

</p>







<p className="mt-3">

Discount:

<b className="text-green-600">

{offer.discount_percentage}%

</b>

</p>







<p className="mt-3">

For:

<b>

{offer.target_audience}

</b>

</p>







<button

className="
bg-orange-600
text-white
px-5
py-2
rounded-xl
mt-5
"

>

Claim Offer 🎁

</button>





</div>


))


}





</div>





</div>


);


}


export default MarketingOffers;