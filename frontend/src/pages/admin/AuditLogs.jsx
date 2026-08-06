import { useEffect, useState } from "react";
import api from "../../services/api";


function AuditLogs(){

    const [logs,setLogs] = useState([]);



    useEffect(()=>{

        fetchLogs();

    },[]);




    const fetchLogs = async()=>{

        try{

            const response = await api.get(
                "/audit-logs/"
            );

            setLogs(response.data);

        }
        catch(error){

            console.log(error);

        }

    };




    return(

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">

                🔐 Audit Logs

            </h1>



            <div className="bg-white shadow rounded-xl overflow-hidden">


            <table className="w-full">


                <thead className="bg-gray-200">

                    <tr>

                        <th className="p-3">
                            Action
                        </th>

                        <th className="p-3">
                            Module
                        </th>

                        <th className="p-3">
                            Description
                        </th>

                        <th className="p-3">
                            Date
                        </th>

                    </tr>

                </thead>



                <tbody>


                {
                    logs.map((log)=>(

                        <tr key={log.id}
                        className="border-b">


                            <td className="p-3">
                                {log.action}
                            </td>


                            <td className="p-3">
                                {log.module}
                            </td>


                            <td className="p-3">
                                {log.description}
                            </td>


                            <td className="p-3">
                                {log.created_at}
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


export default AuditLogs;