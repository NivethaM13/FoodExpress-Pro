
import { Routes, Route } from "react-router-dom";
import AdminUsers from "../pages/admin/AdminUsers";
import Payment from "../pages/customer/Payment";
import AdminRestaurants from "../pages/admin/AdminRestaurants";
import WalletTransactions from "../pages/customer/WalletTransactions";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Chat from "../pages/customer/Chat";
import ReportsAnalytics from "../pages/admin/ReportsAnalytics";
import RefundManagement from "../pages/admin/RefundManagement";
import InventoryManagement from "../pages/restaurant/InventoryManagement";
import AIRecommendations from "../pages/customer/AIRecommendations";
import SupportChat from "../pages/customer/SupportChat";
import Coupons from "../pages/customer/Coupons";
import BusinessDashboard from "../pages/admin/BusinessDashboard";

import SystemSettings from "../pages/admin/SystemSettings";
import RestaurantDashboard from "../pages/restaurant/RestaurantDashboard";
import Review from "../pages/customer/Review";
import AIChatbot from "../pages/customer/AIChatbot";
import Wallet from "../pages/customer/Wallet";
import PaymentHistory from "../pages/customer/PaymentHistory";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import TrackOrder from "../pages/customer/TrackOrder";
import Dashboard from "../pages/admin/Dashboard";
import VerificationManagement from "../pages/admin/VerificationManagement";
import DeliveryDashboard from "../pages/delivery/DeliveryDashboard";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import MyRestaurant from "../pages/restaurant/MyRestaurant";
import RestaurantSettings from "../pages/restaurant/RestaurantSettings";
import Verification from "../pages/restaurant/Verification";
import VerificationStatus from "../pages/restaurant/VerificationStatus";
import Menu from "../pages/restaurant/Menu";
import AuditLogs from "../pages/admin/AuditLogs";
import SecurityMonitor from "../pages/admin/SecurityMonitor";
import AdminBranches from "../pages/admin/AdminBranches";
import Notifications from "../pages/customer/Notifications";
import RestaurantReviews from "../pages/customer/RestaurantReviews";
import Home from "../pages/customer/Home";

import Profile from "../pages/customer/Profile";
import CustomerMenu from "../pages/customer/Menu";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import Orders from "../pages/customer/Orders";
import Favorites from "../pages/customer/Favorites";
import Preferences from "../pages/customer/Preferences";
import KitchenDashboard from "../pages/restaurant/KitchenDashboard";
import ProtectedRoute from "../components/ProtectedRoute";


function AppRoutes() {

  return (

    <Routes>


      {/* Public */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

<Route
 path="/customer/notifications"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
     <Notifications />
   </ProtectedRoute>
 }
/>

<Route
 path="/admin/system-settings"
 element={<SystemSettings />}
/>

<Route
  path="/admin/audit-logs"
  element={<AuditLogs />}
/>


<Route
  path="/admin/security-monitor"
  element={<SecurityMonitor />}
/>


<Route
  path="/admin/business-dashboard"
  element={<BusinessDashboard />}
/>


<Route

path="/customer/dashboard"

element={

<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerDashboard />

</ProtectedRoute>

}

/>


<Route

path="/admin/refunds"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>

<RefundManagement />

</ProtectedRoute>

}

/>




<Route

path="/customer/support-chat"

element={

<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<SupportChat />

</ProtectedRoute>

}

/>


<Route

path="/customer/ai-recommendations"

element={

<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<AIRecommendations />

</ProtectedRoute>

}

/>




<Route

path="/restaurant/inventory"

element={

<ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>

<InventoryManagement />

</ProtectedRoute>

}

/>


<Route

path="/admin/reports"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>

<ReportsAnalytics />

</ProtectedRoute>

}

/>


<Route

path="/customer/ai-chatbot"

element={

<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<AIChatbot />

</ProtectedRoute>

}

/>



<Route

path="/admin/restaurants"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>

<AdminRestaurants />

</ProtectedRoute>

}

/>


<Route

path="/admin/users"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>

<AdminUsers />

</ProtectedRoute>

}

/>



<Route

path="/restaurant/dashboard"

element={

<ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>

<RestaurantDashboard />

</ProtectedRoute>

}

/>

<Route
 path="/customer/chat"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <Chat />
   </ProtectedRoute>
 }
/>



<Route

path="/admin/dashboard"

element={

<ProtectedRoute allowedRoles={["ADMIN"]}>

<AdminDashboard />

</ProtectedRoute>

}

/>
      {/* ADMIN */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      <Route
  path="/admin/branches"
  element={<AdminBranches />}
/>

      <Route
 path="/customer/coupons"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
     <Coupons />
   </ProtectedRoute>
 }
/>


<Route
 path="/customer/wallet-transactions"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
     <WalletTransactions />
   </ProtectedRoute>
 }
/>

      <Route
        path="/admin/verification"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <VerificationManagement />
          </ProtectedRoute>
        }
      />


<Route
 path="/restaurant/kitchen"
 element={
   <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
     <KitchenDashboard />
   </ProtectedRoute>
 }
/>


<Route
 path="/delivery/dashboard"
 element={
   <ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]}>
     <DeliveryDashboard />
   </ProtectedRoute>
 }
/>
<Route
 path="/customer/track-order/:id"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
     <TrackOrder />
   </ProtectedRoute>
 }
/>

<Route
 path="/customer/payment"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
     <Payment />
   </ProtectedRoute>
 }
/>
      {/* RESTAURANT OWNER */}

      <Route
        path="/restaurant/dashboard"
        element={
          <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
            <RestaurantDashboard />
          </ProtectedRoute>
        }
      />

<Route
 path="/customer/wallet"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
     <Wallet />
   </ProtectedRoute>
 }
/>
      <Route
        path="/restaurant/my-restaurant"
        element={
          <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
            <MyRestaurant />
          </ProtectedRoute>
        }
      />



<Route
 path="/customer/review"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
     <Review />
   </ProtectedRoute>
 }
/>


<Route
 path="/customer/reviews"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
     <RestaurantReviews />
   </ProtectedRoute>
 }
/>

      <Route
        path="/restaurant/settings"
        element={<RestaurantSettings />}
      />


      <Route
        path="/restaurant/menu"
        element={<Menu />}
      />


      <Route
        path="/restaurant/verification"
        element={<Verification />}
      />


      <Route
        path="/restaurant/verification-status"
        element={<VerificationStatus />}
      />


<Route
 path="/customer/payment-history"
 element={
   <ProtectedRoute allowedRoles={["CUSTOMER"]}>
     <PaymentHistory />
   </ProtectedRoute>
 }
/>





      {/* CUSTOMER */}


      <Route
        path="/customer/home"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/customer/profile"
        element={<Profile />}
      />


      {/* IMPORTANT - Customer Menu */}

      <Route
        path="/customer/menu"
        element={<CustomerMenu />}
      />



      <Route
        path="/customer/cart"
        element={<Cart />}
      />


      <Route
        path="/customer/checkout"
        element={<Checkout />}
      />


      <Route
        path="/customer/orders"
        element={<Orders />}
      />


      <Route
        path="/customer/favorites"
        element={<Favorites />}
      />


      <Route
        path="/customer/preferences"
        element={<Preferences />}
      />


    </Routes>

  );

}


export default AppRoutes;