import { useEffect, useState } from "react";
import api from "../../services/api";


function SecurityMonitor(){


    const [data,setData] = useState({});



    useEffect(()=>{

        fetchData();

    },[]);



    const fetchData = async()=>{

        try{

            const response = await api.get(
                "/security-monitor/"
            );

            setData(response.data);

        }
        catch(error){

            console.log(error);

        }

    };




    return(

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">

                🛡 Security Monitoring

            </h1>



            <div className="grid md:grid-cols-5 gap-5">


                <Card 
                title="Total Logs"
                value={data.total_logs}
                />


                <Card
                title="Login"
                value={data.login_events}
                />


                <Card
                title="Orders"
                value={data.order_events}
                />


                <Card
                title="Payments"
                value={data.payment_events}
                />


                <Card
                title="Admin"
                value={data.admin_events}
                />


            </div>


        </div>

    );

}



function Card({title,value}){

    return(

        <div className="bg-white shadow rounded-xl p-5">

            <h2 className="text-gray-500">
                {title}
            </h2>


            <p className="text-3xl font-bold">
                {value || 0}
            </p>


        </div>

    );

}



export default SecurityMonitor;