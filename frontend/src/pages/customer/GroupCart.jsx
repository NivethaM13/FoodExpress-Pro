import { useEffect, useState } from "react";
import api from "../../services/api";


function GroupCart() {


    const [groupId, setGroupId] = useState("");

    const [cartItems, setCartItems] = useState([]);


    const fetchCart = async () => {

        try {

            const response = await api.get(
                `/group-cart/${groupId}`
            );

            setCartItems(response.data);

        }
        catch(error){

            console.log(error);

        }

    };





    useEffect(()=>{

        if(groupId){

            fetchCart();

        }

    },[]);







    const removeItem = async(id)=>{

        try{

            await api.delete(
                `/group-cart/${id}`
            );


            fetchCart();

        }
        catch(error){

            console.log(error);

        }

    };






    return (

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">

                🛒 Group Shared Cart

            </h1>





            <div className="bg-white shadow rounded-xl p-5 mb-6">


                <h2 className="text-xl font-bold mb-3">

                    Enter Group Order ID

                </h2>



                <input

                className="border p-2 mr-3"

                placeholder="Group Order ID"

                value={groupId}

                onChange={
                    e=>setGroupId(e.target.value)
                }

                />



                <button

                onClick={fetchCart}

                className="bg-blue-600 text-white px-5 py-2 rounded"

                >

                    View Cart

                </button>


            </div>







            <div className="bg-white shadow rounded-xl">


                <table className="w-full">


                    <thead className="bg-gray-200">

                        <tr>


                            <th className="p-3">
                                User
                            </th>


                            <th className="p-3">
                                Menu
                            </th>


                            <th className="p-3">
                                Quantity
                            </th>


                            <th className="p-3">
                                Price
                            </th>


                            <th className="p-3">
                                Total
                            </th>


                            <th className="p-3">
                                Action
                            </th>


                        </tr>

                    </thead>





                    <tbody>


                    {
                        cartItems.map((item)=>(

                            <tr
                            key={item.id}
                            className="border-b"
                            >


                                <td className="p-3">

                                    {item.user_id}

                                </td>



                                <td className="p-3">

                                    {item.menu_id}

                                </td>



                                <td className="p-3">

                                    {item.quantity}

                                </td>



                                <td className="p-3">

                                    ₹ {item.price}

                                </td>



                                <td className="p-3 font-bold">

                                    ₹ {item.total}

                                </td>



                                <td className="p-3">


                                    <button

                                    onClick={
                                        ()=>removeItem(item.id)
                                    }

                                    className="bg-red-600 text-white px-3 py-1 rounded"

                                    >

                                        Remove

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


export default GroupCart;