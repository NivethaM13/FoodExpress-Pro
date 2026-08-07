import { useEffect, useState } from "react";
import api from "../../services/api";


function RouteOptimization() {


    const [form,setForm] = useState({

        delivery_assignment_id:"",

        start_location:"",

        end_location:""

    });


    const [routes,setRoutes] = useState([]);

    const [result,setResult] = useState(null);





    const getHistory = async()=>{

        try{

            const response = await api.get(
                "/route-optimization/history"
            );

            setRoutes(response.data);

        }
        catch(error){

            console.log(error);

        }

    };





    useEffect(()=>{

        getHistory();

    },[]);






    const optimizeRoute = async()=>{


        try{


            const response = await api.post(

                "/route-optimization/",

                form

            );


            setResult(response.data);

            getHistory();


        }
        catch(error){

            console.log(error);

        }


    };






return (

<div className="p-8">


<h1 className="text-3xl font-bold mb-6">

🗺️ Route Optimization

</h1>





<div className="bg-white shadow rounded-xl p-6 mb-8">


<h2 className="text-xl font-bold mb-4">

Calculate Optimized Route

</h2>





<input

className="border p-3 w-full mb-3"

placeholder="Delivery Assignment ID"

value={form.delivery_assignment_id}

onChange={
e=>setForm({

...form,

delivery_assignment_id:e.target.value

})
}

/>





<input

className="border p-3 w-full mb-3"

placeholder="Start Location"

value={form.start_location}

onChange={
e=>setForm({

...form,

start_location:e.target.value

})
}

/>





<input

className="border p-3 w-full mb-3"

placeholder="End Location"

value={form.end_location}

onChange={
e=>setForm({

...form,

end_location:e.target.value

})
}

/>





<button

onClick={optimizeRoute}

className="bg-blue-600 text-white px-6 py-3 rounded"

>

Optimize Route

</button>



</div>









{
result &&

<div className="bg-green-100 p-5 rounded-xl mb-8">


<h2 className="text-xl font-bold">

Route Result

</h2>


<p>
Distance: {result.total_distance_km} KM
</p>


<p>
ETA: {result.estimated_time} Minutes
</p>


<p>
Traffic: {result.traffic_status}
</p>


<p>
Status: {result.route_status}
</p>


</div>

}









<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-4">

Route History

</h2>




<table className="w-full">


<thead className="bg-gray-200">

<tr>

<th className="p-3">
Start
</th>

<th className="p-3">
End
</th>

<th className="p-3">
Distance
</th>

<th className="p-3">
ETA
</th>

<th className="p-3">
Traffic
</th>

</tr>

</thead>





<tbody>


{

routes.map((route)=>(


<tr
key={route.id}
className="border-b"
>


<td className="p-3">

{route.start_location}

</td>


<td className="p-3">

{route.end_location}

</td>


<td className="p-3">

{route.total_distance_km} KM

</td>


<td className="p-3">

{route.estimated_time} min

</td>


<td className="p-3">

{route.traffic_status}

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


export default RouteOptimization;