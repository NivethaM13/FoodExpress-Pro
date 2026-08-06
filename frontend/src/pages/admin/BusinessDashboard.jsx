import { useEffect, useState } from "react";
import api from "../../services/api";

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";



function BusinessDashboard(){

    const [data,setData] = useState(null);



    useEffect(()=>{

        fetchDashboard();

    },[]);



    const fetchDashboard = async()=>{

        try{

            const response = await api.get(
                "/business-dashboard/"
            );

            setData(response.data);

        }
        catch(error){

            console.log(error);

        }

    };



    if(!data){

        return (
            <div className="p-8">
                Loading Dashboard...
            </div>
        )

    }



    return (

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">
                📊 Business Intelligence Dashboard
            </h1>



            {/* Cards */}

            <div className="grid md:grid-cols-5 gap-5">


                <Card
                title="Revenue"
                value={data.revenue.value}
                />


                <Card
                title="Customers"
                value={data.customers.value}
                />


                <Card
                title="Orders"
                value={data.orders.value}
                />


                <Card
                title="Restaurants"
                value={data.restaurants.value}
                />


                <Card
                title="Activities"
                value={data.activities.value}
                />

            </div>





            {/* Peak Hours */}

            <div className="bg-white rounded-xl shadow p-5 mt-8">


                <h2 className="text-xl font-bold mb-4">
                    ⏰ Peak Ordering Hours
                </h2>


                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                <LineChart
                    data={data.peak_hours}
                >

                    <CartesianGrid />

                    <XAxis dataKey="hour"/>

                    <YAxis />

                    <Tooltip />

                    <Line
                        dataKey="orders"
                    />

                </LineChart>

                </ResponsiveContainer>


            </div>






            {/* Top Foods */}

            <div className="bg-white rounded-xl shadow p-5 mt-8">


                <h2 className="text-xl font-bold mb-4">
                    🍔 Top Selling Foods
                </h2>


                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                <BarChart
                    data={data.top_foods}
                >

                    <CartesianGrid />

                    <XAxis dataKey="food"/>

                    <YAxis />

                    <Tooltip />

                    <Bar
                    dataKey="quantity"
                    />

                </BarChart>


                </ResponsiveContainer>


            </div>






            {/* Delivery */}

            <div className="bg-white rounded-xl shadow p-5 mt-8">


                <h2 className="text-xl font-bold">
                    🚚 Delivery Performance
                </h2>


                <p className="mt-3">
                    Total Orders:
                    {data.delivery.total_orders}
                </p>


                <p>
                    Delivered:
                    {data.delivery.delivered_orders}
                </p>


            </div>






            {/* Retention */}

            <div className="bg-white rounded-xl shadow p-5 mt-8">


                <h2 className="text-xl font-bold">
                    👥 Customer Retention
                </h2>


                <p className="text-3xl mt-3">
                    {data.retention.repeat_customers}
                </p>


                <p>
                    Repeat Customers
                </p>


            </div>


        </div>

    );

}




function Card({title,value}){

    return (

        <div className="bg-white shadow rounded-xl p-5">

            <h3 className="text-gray-500">
                {title}
            </h3>


            <p className="text-3xl font-bold">
                {value || 0}
            </p>


        </div>

    );

}



export default BusinessDashboard;