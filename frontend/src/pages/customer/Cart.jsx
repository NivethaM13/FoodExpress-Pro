import { useEffect, useState } from "react";
import api from "../../services/api";


function Cart() {


const [cart, setCart] = useState(null);



useEffect(() => {

getCart();

}, []);




const getCart = async () => {

try {


const response = await api.get(
"/cart/"
);


setCart(response.data);


}

catch(error){

console.log(error);

}


};





const updateQuantity = async(id, quantity)=>{


try{


await api.put(

`/cart/${id}`,

{
quantity: quantity
}

);


getCart();


}

catch(error){

console.log(error);

}


};





const removeItem = async(id)=>{


try{


await api.delete(

`/cart/${id}`

);


getCart();


}

catch(error){

console.log(error);

}


};






return (

<div className="p-8">


<h1 className="text-4xl font-bold mb-8">

My Cart 🛒

</h1>




{

!cart?.items?.length &&

<h2 className="text-xl">

Cart is empty

</h2>

}




<div className="space-y-5">


{

cart?.items?.map((item)=>(


<div

key={item.id}

className="
bg-white
shadow
rounded-xl
p-5
flex
justify-between
items-center
"


>



<div>


<h2 className="text-xl font-bold">

Food Item ID: {item.menu_id}

</h2>



<p>

Price: ₹{item.price}

</p>



<p>

Quantity: {item.quantity}

</p>


</div>






<div className="space-x-3">



<button

onClick={()=>updateQuantity(
item.id,
item.quantity + 1
)}

className="
bg-green-600
text-white
px-3
py-2
rounded
"

>

+

</button>





<button

onClick={()=>updateQuantity(
item.id,
item.quantity - 1
)}

className="
bg-yellow-600
text-white
px-3
py-2
rounded
"

>

-

</button>






<button

onClick={()=>removeItem(item.id)}

className="
bg-red-600
text-white
px-3
py-2
rounded
"

>

Remove

</button>



</div>



</div>



))

}



</div>



</div>


);


}


export default Cart;