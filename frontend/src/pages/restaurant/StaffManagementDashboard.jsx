import { useState } from "react";
import api from "../../services/api";


function StaffManagementDashboard() {


    const [restaurantId, setRestaurantId] = useState("");

    const [staff, setStaff] = useState([]);


    const [form, setForm] = useState({

        staff_name: "",

        phone: "",

        email: "",

        role: "STAFF",

        shift: "MORNING",

        attendance_status: "PRESENT",

        performance_score: 0

    });







    const getStaff = async()=>{


        try{


            const response = await api.get(

                `/restaurant-staff/${restaurantId}`

            );


            setStaff(response.data);


        }
        catch(error){

            console.log(error);

        }


    };








    const addStaff = async()=>{


        try{


            await api.post(

                "/restaurant-staff/",

                {

                    restaurant_id: Number(restaurantId),

                    ...form,

                    performance_score:
                    Number(form.performance_score)

                }

            );


            alert(
                "Staff added successfully"
            );


            getStaff();


        }
        catch(error){

            console.log(error);

        }


    };








return (

<div className="p-8">



<h1 className="text-3xl font-bold mb-6">

👨‍🍳 Restaurant Staff Management

</h1>








<div className="bg-white shadow rounded-xl p-6 mb-8">


<h2 className="text-xl font-bold mb-4">

Add Staff

</h2>



<input

className="border p-3 w-full mb-3"

placeholder="Restaurant ID"

value={restaurantId}

onChange={
e=>setRestaurantId(e.target.value)
}

/>



<input

className="border p-3 w-full mb-3"

placeholder="Staff Name"

value={form.staff_name}

onChange={
e=>setForm({
...form,
staff_name:e.target.value
})
}

/>





<input

className="border p-3 w-full mb-3"

placeholder="Phone"

value={form.phone}

onChange={
e=>setForm({
...form,
phone:e.target.value
})
}

/>






<input

className="border p-3 w-full mb-3"

placeholder="Email"

value={form.email}

onChange={
e=>setForm({
...form,
email:e.target.value
})
}

/>








<select

className="border p-3 w-full mb-3"

value={form.role}

onChange={
e=>setForm({
...form,
role:e.target.value
})
}

>


<option>STAFF</option>

<option>CHEF</option>

<option>MANAGER</option>

<option>DELIVERY</option>


</select>








<select

className="border p-3 w-full mb-3"

value={form.shift}

onChange={
e=>setForm({
...form,
shift:e.target.value
})
}

>


<option>MORNING</option>

<option>AFTERNOON</option>

<option>NIGHT</option>


</select>








<input

className="border p-3 w-full mb-3"

placeholder="Performance Score"

type="number"

value={form.performance_score}

onChange={
e=>setForm({
...form,
performance_score:e.target.value
})
}

/>







<button

onClick={addStaff}

className="bg-green-600 text-white px-6 py-3 rounded"

>

Add Staff

</button>



</div>









<div className="bg-white shadow rounded-xl p-6">


<div className="flex justify-between mb-5">


<h2 className="text-xl font-bold">

Staff List

</h2>


<button

onClick={getStaff}

className="bg-blue-600 text-white px-5 py-2 rounded"

>

Load Staff

</button>


</div>








<table className="w-full">


<thead className="bg-gray-100">


<tr>

<th className="p-3">
Name
</th>

<th className="p-3">
Role
</th>

<th className="p-3">
Shift
</th>

<th className="p-3">
Attendance
</th>

<th className="p-3">
Performance
</th>


</tr>


</thead>







<tbody>


{

staff.map((item)=>(


<tr
key={item.id}
className="border-t"
>


<td className="p-3">
{item.staff_name}
</td>


<td className="p-3">
{item.role}
</td>


<td className="p-3">
{item.shift}
</td>


<td className="p-3">
{item.attendance_status}
</td>


<td className="p-3">
{item.performance_score}
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


export default StaffManagementDashboard;