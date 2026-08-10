import { useEffect, useState } from "react";

import api from "../../services/api";



function FinancialDashboard(){


const [reports,setReports] = useState([]);





useEffect(()=>{

    fetchReports();

},[]);






const fetchReports = async()=>{


try{


const response = await api.get(
"/financial-dashboard/"
);


setReports(response.data);



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

💰 Financial Dashboard

</h1>







<div className="
grid
md:grid-cols-4
gap-6
mb-10
">





<div className="
bg-white
rounded-xl
shadow
p-6
">

<h2 className="text-xl font-bold">

Daily Revenue

</h2>


<p className="
text-3xl
text-green-600
mt-3
">

₹
{
reports
.filter(
r=>r.report_type==="DAILY_REVENUE"
)
.reduce(
(sum,r)=>sum+r.total_revenue,
0
)
}

</p>


</div>








<div className="
bg-white
rounded-xl
shadow
p-6
">


<h2 className="text-xl font-bold">

Delivery Charges

</h2>


<p className="
text-3xl
text-blue-600
mt-3
">

₹
{
reports
.reduce(
(sum,r)=>sum+r.delivery_charges,
0
)
}

</p>


</div>









<div className="
bg-white
rounded-xl
shadow
p-6
">


<h2 className="text-xl font-bold">

Refund Reports

</h2>


<p className="
text-3xl
text-red-600
mt-3
">

₹
{
reports
.reduce(
(sum,r)=>sum+r.refund_amount,
0
)
}

</p>


</div>









<div className="
bg-white
rounded-xl
shadow
p-6
">


<h2 className="text-xl font-bold">

Wallet Transactions

</h2>


<p className="
text-3xl
text-purple-600
mt-3
">

₹
{
reports
.reduce(
(sum,r)=>sum+r.wallet_amount,
0
)
}

</p>


</div>







</div>









<h2 className="
text-3xl
font-bold
mb-5
">

📊 Financial Reports

</h2>









{

reports.map((report)=>(



<div

key={report.id}

className="
bg-white
rounded-xl
shadow
p-6
mb-5
"

>



<h3 className="
text-2xl
font-bold
">

{report.report_type}

</h3>





<p className="mt-3">

Restaurant ID:

{report.restaurant_id || "All"}

</p>





<p>

Revenue:

<b>
₹ {report.total_revenue}
</b>

</p>





<p>

Delivery Charges:

₹ {report.delivery_charges}

</p>





<p>

Refund:

₹ {report.refund_amount}

</p>





<p>

Wallet:

₹ {report.wallet_amount}

</p>





<p>

Transactions:

{report.transaction_count}

</p>





</div>



))


}





</div>


);


}



export default FinancialDashboard;