import { Link } from "react-router-dom";
import { getRole } from "../services/auth";


function Sidebar() {

  const role = getRole();


  return (

    <div className="
    w-64
    h-screen
    overflow-y-auto
    bg-gray-900
    text-white
    p-6
    ">


      <h2 className="
      text-2xl
      font-bold
      mb-8
      ">

      🍔 FoodExpress

      </h2>



      <ul className="space-y-4">



{/* ADMIN MENU */}

{
role === "ADMIN" && (

<>

<li>

<Link
to="/admin/dashboard"
className="block hover:text-orange-400"
>

 Admin Dashboard 👑

</Link>

</li>


<li>

<Link
to="/admin/restaurants"
className="block hover:text-orange-400"
>

Restaurants 🍽️

</Link>

</li>



<li>

<Link

to="/admin/reports"

className="block hover:text-orange-400"

>

 Reports & Analytics 📊

</Link>

</li>




<Link
 to="/admin/branches"
 className="flex items-center gap-3"
>
 Branch Management 🏪
</Link>

<li>

<Link

to="/admin/refunds"

className="block hover:text-orange-400"

>

 Refund Management 💳

</Link>

</li>





<li>

<Link
to="/admin/users"
className="block hover:text-orange-400"
>

Users 👥

</Link>

</li>


<li>

<Link
to="/admin/verification"
className="block hover:text-orange-400"
>

Verification Requests ✅

</Link>

</li>


</>

)

}




{/* RESTAURANT OWNER */}

{
role === "RESTAURANT_OWNER" && (

<>

<li>

<Link
to="/restaurant/dashboard"
className="block hover:text-orange-400"
>

 Restaurant Dashboard 🍔

</Link>

</li>


<li>

<Link
to="/restaurant/settings"
className="block hover:text-orange-400"
>

Restaurant Settings  ⚙️

</Link>

</li>


<li>

<Link
to="/restaurant/kitchen"
className="block hover:text-orange-400"
>

Kitchen Dashboard 🍳

</Link>

</li>

<li>

<Link

to="/restaurant/inventory"

className="block hover:text-orange-400"

>

 Inventory Management 📦

</Link>

</li>




<li>

<Link
to="/restaurant/menu"
className="block hover:text-orange-400"
>

Menu 🍽️

</Link>

</li>


</>

)

}






{/* CUSTOMER */}

{
role === "CUSTOMER" && (

<>

<li>

<Link
to="/customer/dashboard"
className="block hover:text-orange-400"
>

👤 Customer Dashboard

</Link>

</li>


<li>

<Link
to="/customer/orders"
className="block hover:text-orange-400"
>

My Orders 📦

</Link>

</li>


<li>

<Link
to="/customer/cart"
className="block hover:text-orange-400"
>

My Cart 🛒

</Link>

</li>


<li>

<Link
to="/customer/wallet"
className="block hover:text-orange-400"
>

Wallet 💰

</Link>

</li>


<li>

<Link
to="/customer/notifications"
className="block hover:text-orange-400"
>

Notifications 🔔

</Link>

</li>


<li>

<Link
to="/customer/ai-recommendations"
className="block hover:text-orange-400"
>

AI Recommendations 🤖

</Link>

</li>


<li>

<Link
to="/customer/ai-chatbot"
className="block hover:text-orange-400"
>

AI Support Chatbot 🤖

</Link>

</li>


<li>

<Link
to="/customer/profile"
className="block hover:text-orange-400"
>

My Profile

</Link>

</li>


</>

)

}






{/* DELIVERY PARTNER */}

{
role === "DELIVERY_PARTNER" && (

<>

<li>

<Link
to="/delivery/dashboard"
className="block hover:text-orange-400"
>

🚴 Delivery Dashboard

</Link>

</li>


<li>

<Link
to="/delivery/orders"
className="block hover:text-orange-400"
>

Assigned Orders

</Link>

</li>


</>

)

}



      </ul>


    </div>

  );

}


export default Sidebar;