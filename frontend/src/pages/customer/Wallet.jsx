import { useEffect, useState } from "react";
import api from "../../services/api";


function Wallet(){

const [wallet,setWallet]=useState(null);


useEffect(()=>{
 fetchWallet();
},[]);


const fetchWallet=async()=>{

try{

const response = await api.get("/wallet/");

setWallet(response.data);

}

catch(error){
console.log(error);
}

};



return(

<div className="p-8">

<h1 className="text-4xl font-bold mb-8">
My Wallet 💰
</h1>


<div className="bg-white shadow rounded-xl p-8">


<h2 className="text-3xl font-bold">
Balance
</h2>


<p className="text-4xl mt-5">
₹ {wallet?.balance || 0}
</p>


<h2 className="text-3xl font-bold mt-10">
Reward Points ⭐
</h2>


<p className="text-3xl mt-5">
{wallet?.reward_points || 0}
</p>


</div>


</div>

);

}


export default Wallet;