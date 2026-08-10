import { Link } from "react-router-dom";
import { getRole } from "../services/auth";


function Sidebar() {


const role = getRole();


return (

<div
className="
w-64
h-screen
overflow-y-auto
bg-gray-900
text-white
p-6
"
>


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


<Link
to="/admin/dashboard"
className="block hover:text-orange-400"
>
Admin Dashboard 👑
</Link>


<Link
to="/admin/reports"
className="block hover:text-orange-400"
>
Reports & Analytics 📊
</Link>



<li>
  <Link
    to="/admin/platform-monitoring"
    className="block hover:text-orange-400"
  >
     Platform Monitoring 🛡️
  </Link>
</li>


<li>
  <Link
    to="/admin/super-admin-control"
    className="block hover:text-orange-400"
  >
 Super Admin Control Center👑
  </Link>
</li>

<Link
to="/admin/financial-dashboard"
className="block hover:text-orange-400"
>
Financial Dashboard 💰
</Link>


<Link 
to="/admin/business-intelligence"

className="block hover:text-orange-400">
  Business Intelligence 📊
</Link>





<Link
to="/admin/customer-support"
className="block hover:text-orange-400"
>
Customer Support 🎫
</Link>





<Link
to="/admin/marketing-campaigns"
className="block hover:text-orange-400"
>
Marketing Campaigns 📢
</Link>




<Link
to="/admin/refunds"
className="block hover:text-orange-400"
>
Refund Management 💳
</Link>


<Link
to="/admin/users"
className="block hover:text-orange-400"
>
Users 👥
</Link>



<Link
to="/admin/verification"
className="block hover:text-orange-400"
>
Verification Requests ✅
</Link>


</>

)

}








{/* RESTAURANT OWNER */}

{
role === "RESTAURANT_OWNER" && (

<>

<Link
to="/restaurant/dashboard"
className="block hover:text-orange-400"
>
Restaurant Dashboard 🍔
</Link>



<Link
to="/restaurant/settings"
className="block hover:text-orange-400"
>
Restaurant Settings ⚙️
</Link>




<Link
to="/staff-management"
className="block hover:text-orange-400"
>
 Staff Management 👨‍🍳
</Link>




<Link
    to="/financial-dashboard"
    className="block hover:text-orange-400"
>
     Financial Dashboard 💰
</Link>


<Link
    to="/smart-inventory"
    className="block hover:text-orange-400"
>
     Smart Inventory 📦
</Link>

<Link
to="/restaurant/kitchen"
className="block hover:text-orange-400"
>
Kitchen Dashboard 🍳
</Link>



<Link
to="/restaurant/inventory"
className="block hover:text-orange-400"
>
Inventory Management 📦
</Link>



<Link
to="/restaurant/menu"
className="block hover:text-orange-400"
>
Menu 🍽️
</Link>



<Link
to="/restaurant-performance"
className="block hover:text-orange-400"
>
 Performance Dashboard📊
</Link>



<Link
to="/ai-demand-dashboard"
className="block hover:text-orange-400"
>
 AI Demand Prediction🤖
</Link>


</>

)

}








{/* CUSTOMER */}

{
role === "CUSTOMER" && (

<>

<Link
to="/customer/dashboard"
className="block hover:text-orange-400"
>
Customer Dashboard 👤
</Link>


<Link
to="/customer/orders"
className="block hover:text-orange-400"
>
My Orders 📦
</Link>



<Link
to="/membership-plans"
className="block hover:text-orange-400"
>
Membership Plans 👑
</Link>



<Link
to="/customer/cart"
className="block hover:text-orange-400"
>
My Cart 🛒
</Link>



<Link
to="/customer/wallet"
className="block hover:text-orange-400"
>
Wallet 💰
</Link>



<Link
to="/customer/complaints"
className="block hover:text-orange-400"
>
Customer Support 🎫
</Link>




<Link
to="/customer/notifications"
className="block hover:text-orange-400"
>
Notifications 🔔
</Link>



<Link
to="/customer/marketing-offers"
className="block hover:text-orange-400"
>
Personalized Offers 🎁
</Link>

<Link
to="/customer/ai-recommendations"
className="block hover:text-orange-400"
>
AI Recommendations 🤖
</Link>



<Link
to="/customer/ai-chatbot"
className="block hover:text-orange-400"
>
AI Support Chatbot 🤖
</Link>



<Link
to="/customer/profile"
className="block hover:text-orange-400"
>
My Profile 🎟️
</Link>


</>

)

}




{/* DELIVERY PARTNER */}

{
role === "DELIVERY_PARTNER" && (

<>

<Link
to="/delivery/dashboard"
className="block hover:text-orange-400"
>
 Delivery Dashboard 🚴
</Link>



<Link
to="/delivery-earnings"
className="block hover:text-orange-400"
>
Earnings Management💰
</Link>




<Link
to="/delivery/orders"
className="block hover:text-orange-400"
>
Assigned Orders 📋
</Link>


</>

)

}



</ul>


</div>


);


}


export default Sidebar;