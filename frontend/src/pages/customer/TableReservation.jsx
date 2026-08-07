import { useEffect, useState } from "react";
import api from "../../services/api";


function TableReservation() {


    const [reservations,setReservations] = useState([]);


    const [form,setForm] = useState({

        restaurant_id:"",

        reservation_date:"",

        reservation_time:"",

        seats:1

    });





    const fetchReservations = async()=>{

        try{

            const response = await api.get(
                "/table-reservations/"
            );

            setReservations(response.data);

        }
        catch(error){

            console.log(error);

        }

    };





    useEffect(()=>{

        fetchReservations();

    },[]);








    const bookTable = async()=>{


        try{


            await api.post(

                "/table-reservations/",

                form

            );


            alert(
                "Table booked successfully"
            );


            setForm({

                restaurant_id:"",

                reservation_date:"",

                reservation_time:"",

                seats:1

            });


            fetchReservations();


        }
        catch(error){

            console.log(error);

        }


    };







    const cancelReservation = async(id)=>{


        try{


            await api.put(

                `/table-reservations/${id}/cancel`

            );


            alert(
                "Reservation cancelled"
            );


            fetchReservations();


        }
        catch(error){

            console.log(error);

        }


    };







return (

<div className="p-8">


<h1 className="text-3xl font-bold mb-6">

🍽️ Restaurant Table Reservation

</h1>





<div className="bg-white shadow rounded-xl p-6 mb-8">


<h2 className="text-xl font-bold mb-4">

Book Table

</h2>





<input

className="border p-3 w-full mb-3"

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

className="border p-3 w-full mb-3"

value={form.reservation_date}

onChange={
e=>setForm({

...form,

reservation_date:e.target.value

})
}

/>





<input

type="time"

className="border p-3 w-full mb-3"

value={form.reservation_time}

onChange={
e=>setForm({

...form,

reservation_time:e.target.value

})
}

/>





<input

type="number"

className="border p-3 w-full mb-3"

placeholder="Seats"

value={form.seats}

onChange={
e=>setForm({

...form,

seats:e.target.value

})
}

/>





<button

onClick={bookTable}

className="bg-orange-600 text-white px-6 py-3 rounded"

>

Book Table

</button>


</div>








<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">

Reservation History

</h2>





<table className="w-full">


<thead className="bg-gray-200">


<tr>

<th className="p-3">
Restaurant
</th>


<th className="p-3">
Date
</th>


<th className="p-3">
Time
</th>


<th className="p-3">
Seats
</th>


<th className="p-3">
Status
</th>


<th className="p-3">
Action
</th>


</tr>


</thead>





<tbody>


{

reservations.map((item)=>(


<tr

key={item.id}

className="border-b"

>


<td className="p-3">

{item.restaurant_id}

</td>



<td className="p-3">

{item.reservation_date}

</td>



<td className="p-3">

{item.reservation_time}

</td>



<td className="p-3">

{item.seats}

</td>



<td className="p-3">

{item.status}

</td>



<td className="p-3">


<button

onClick={
()=>cancelReservation(item.id)
}

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


export default TableReservation;