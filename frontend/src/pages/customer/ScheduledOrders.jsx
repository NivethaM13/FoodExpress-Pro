
import { useEffect, useState } from "react";
import api from "../../services/api";


function ScheduledOrders(){

    const [orders,setOrders] = useState([]);

    const [form,setForm] = useState({

        restaurant_id:"",
        scheduled_date:"",
        scheduled_time:"",
        recurring_type:"NONE",
        reminder_time:30

    });



    useEffect(()=>{

        fetchOrders();

    },[]);




    const fetchOrders = async()=>{

        try{

            const response = await api.get(
                "/scheduled-orders/"
            );

            setOrders(response.data);

        }
        catch(error){

            console.log(error);

        }

    };





    const createSchedule = async()=>{

        try{

            await api.post(
                "/scheduled-orders/",
                form
            );


            alert(
                "Order Scheduled Successfully"
            );


            fetchOrders();


        }
        catch(error){

            console.log(error);

        }

    };





    const cancelOrder = async(id)=>{

        try{

            await api.put(
                `/scheduled-orders/${id}/cancel`
            );


            fetchOrders();


        }
        catch(error){

            console.log(error);

        }

    };





return(

<div className="p-8">


<h1 className="text-3xl font-bold mb-6">

⏰ Scheduled Food Orders

</h1>




<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">

Create Schedule

</h2>



<input

className="border p-2 m-2"

placeholder="Restaurant ID"

value={form.restaurant_id}

onChange={
e=>setForm({
...form,
restaurant_id:e.target.value
})
}

/>




<input

type="date"

className="border p-2 m-2"

value={form.scheduled_date}

onChange={
e=>setForm({
...form,
scheduled_date:e.target.value
})
}

/>




<input

type="time"

className="border p-2 m-2"

value={form.scheduled_time}

onChange={
e=>setForm({
...form,
scheduled_time:e.target.value
})
}

/>




<select

className="border p-2 m-2"

value={form.recurring_type}

onChange={
e=>setForm({
...form,
recurring_type:e.target.value
})
}

>


<option value="NONE">
One Time
</option>

<option value="DAILY">
Daily
</option>

<option value="WEEKLY">
Weekly
</option>

<option value="MONTHLY">
Monthly
</option>


</select>





<input

type="number"

className="border p-2 m-2"

value={form.reminder_time}

onChange={
e=>setForm({
...form,
reminder_time:e.target.value
})
}

/>




<button

onClick={createSchedule}

className="bg-blue-600 text-white px-5 py-2 rounded"

>

Schedule Order

</button>



</div>







<div className="mt-8 bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">

My Scheduled Orders

</h2>



<table className="w-full">


<thead className="bg-gray-200">

<tr>

<th className="p-3">
Date
</th>

<th className="p-3">
Time
</th>

<th className="p-3">
Type
</th>

<th className="p-3">
Status
</th>

<th>
Action
</th>

</tr>

</thead>




<tbody>


{
orders.map(order=>(

<tr
key={order.id}
className="border-b"
>


<td className="p-3">
{order.scheduled_date}
</td>


<td className="p-3">
{order.scheduled_time}
</td>


<td className="p-3">
{order.recurring_type}
</td>


<td className="p-3">
{order.status}
</td>


<td>


<button

onClick={()=>cancelOrder(order.id)}

className="bg-red-600 text-white px-3 py-1 rounded"

>

Cancel

</button>


</td>


</tr>


))
}


</tbody>


</table>


</div>



</div>

);


}


export default ScheduledOrders;