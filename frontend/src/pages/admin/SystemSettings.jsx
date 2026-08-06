import { useEffect, useState } from "react";
import api from "../../services/api";


function SystemSettings(){

    const [settings,setSettings] = useState([]);

    const [editId,setEditId] = useState(null);


    const [form,setForm] = useState({

        setting_key:"",
        setting_value:"",
        setting_type:"",
        description:""

    });



    useEffect(()=>{

        fetchSettings();

    },[]);




    const fetchSettings = async()=>{

        try{

            const response = await api.get(
                "/system-settings/"
            );

            setSettings(response.data);

        }
        catch(error){

            console.log(error);

        }

    };





    const saveSetting = async()=>{

        try{


            if(editId){


                await api.put(

                    `/system-settings/${editId}`,

                    form

                );


            }
            else{


                await api.post(

                    "/system-settings/",

                    form

                );


            }



            setEditId(null);



            setForm({

                setting_key:"",
                setting_value:"",
                setting_type:"",
                description:""

            });



            fetchSettings();


        }
        catch(error){

            console.log(error);

        }


    };






    const editSetting = (item)=>{


        setEditId(item.id);


        setForm({

            setting_key:item.setting_key,

            setting_value:item.setting_value,

            setting_type:item.setting_type,

            description:item.description || ""

        });


    };






    const deleteSetting = async(id)=>{


        try{


            await api.delete(

                `/system-settings/${id}`

            );


            fetchSettings();


        }
        catch(error){

            console.log(error);

        }


    };





    return (

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">

                ⚙️ System Settings

            </h1>




            <div className="grid md:grid-cols-4 gap-5 mt-8">


                <div className="bg-white shadow rounded-xl p-5">

                    <h2 className="text-xl font-bold">
                        💰 Tax Management
                    </h2>

                    <p className="mt-3">
                        GST Percentage
                    </p>

                    <p>
                        Service Tax Configuration
                    </p>

                </div>



                <div className="bg-white shadow rounded-xl p-5">

                    <h2 className="text-xl font-bold">
                        🚚 Delivery Charges
                    </h2>

                    <p className="mt-3">
                        Base Delivery Fee
                    </p>

                    <p>
                        Free Delivery Limit
                    </p>

                </div>



                <div className="bg-white shadow rounded-xl p-5">

                    <h2 className="text-xl font-bold">
                        💳 Payment Gateway
                    </h2>

                    <p className="mt-3">
                        Gateway Provider
                    </p>

                    <p>
                        Online Payment Status
                    </p>

                </div>



                <div className="bg-white shadow rounded-xl p-5">

                    <h2 className="text-xl font-bold">
                        🔔 Notifications
                    </h2>

                    <p className="mt-3">
                        Email
                    </p>

                    <p>
                        SMS
                    </p>

                </div>


            </div>


                        {/* Backup & Recovery */}

            <div className="bg-white shadow rounded-xl p-5 mt-8">


                <h2 className="text-xl font-bold">

                    💾 Backup & Recovery

                </h2>


                <p className="mt-3">
                    Automatic Backup : Enabled
                </p>


                <p>
                    Database Recovery Management
                </p>



                <button

                className="bg-green-600 text-white px-5 py-2 rounded mt-4"

                >

                    Create Backup

                </button>


            </div>







            {/* Add / Update Setting */}

            <div className="bg-white shadow rounded-xl p-5 mb-8 mt-8">


                <h2 className="text-xl font-bold mb-4">

                    {
                        editId 
                        ? "Update Configuration"
                        : "Add Configuration"
                    }

                </h2>




                <input

                className="border p-2 m-2"

                placeholder="Key"

                value={form.setting_key}

                onChange={
                    e=>setForm({
                        ...form,
                        setting_key:e.target.value
                    })
                }

                />





                <input

                className="border p-2 m-2"

                placeholder="Value"

                value={form.setting_value}

                onChange={
                    e=>setForm({
                        ...form,
                        setting_value:e.target.value
                    })
                }

                />





                <input

                className="border p-2 m-2"

                placeholder="Type"

                value={form.setting_type}

                onChange={
                    e=>setForm({
                        ...form,
                        setting_type:e.target.value
                    })
                }

                />





                <input

                className="border p-2 m-2"

                placeholder="Description"

                value={form.description}

                onChange={
                    e=>setForm({
                        ...form,
                        description:e.target.value
                    })
                }

                />






                <button

                onClick={saveSetting}

                className="bg-blue-600 text-white px-5 py-2 rounded"

                >

                {
                    editId
                    ? "Update Setting"
                    : "Add Setting"
                }

                </button>


            </div>








            {/* Settings List */}


            <div className="bg-white shadow rounded-xl">


                <table className="w-full">


                    <thead className="bg-gray-200">

                        <tr>

                            <th className="p-3">
                                Key
                            </th>


                            <th className="p-3">
                                Value
                            </th>


                            <th className="p-3">
                                Type
                            </th>


                            <th className="p-3">
                                Description
                            </th>


                            <th className="p-3">
                                Actions
                            </th>


                        </tr>


                    </thead>




                    <tbody>


                    {
                        settings.map((item)=>(


                            <tr

                            key={item.id}

                            className="border-b"

                            >



                                <td className="p-3">

                                    {item.setting_key}

                                </td>




                                <td className="p-3">

                                    {item.setting_value}

                                </td>




                                <td className="p-3">

                                    {item.setting_type}

                                </td>




                                <td className="p-3">

                                    {item.description}

                                </td>




                                <td className="p-3">


                                    <button

                                    onClick={()=>editSetting(item)}

                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"

                                    >

                                    Edit

                                    </button>





                                    <button

                                    onClick={()=>deleteSetting(item.id)}

                                    className="bg-red-600 text-white px-3 py-1 rounded"

                                    >

                                    Delete

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



export default SystemSettings;