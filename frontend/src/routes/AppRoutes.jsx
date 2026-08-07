import { Routes, Route } from "react-router-dom";


// layouts
import CustomerLayout from "../layouts/CustomerLayout";
import RestaurantLayout from "../layouts/RestaurantLayout";


// components
import ProtectedRoute from "../components/ProtectedRoute";


// AUTH
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";


// CUSTOMER
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import Home from "../pages/customer/Home";
import Profile from "../pages/customer/Profile";

import CustomerMenu from "../pages/customer/Menu";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import Orders from "../pages/customer/Orders";
import Favorites from "../pages/customer/Favorites";
import Preferences from "../pages/customer/Preferences";

import Payment from "../pages/customer/Payment";
import PaymentHistory from "../pages/customer/PaymentHistory";
import Wallet from "../pages/customer/Wallet";
import WalletTransactions from "../pages/customer/WalletTransactions";

import Chat from "../pages/customer/Chat";
import SupportChat from "../pages/customer/SupportChat";

import AIRecommendations from "../pages/customer/AIRecommendations";
import AIChatbot from "../pages/customer/AIChatbot";

import Coupons from "../pages/customer/Coupons";
import ScheduledOrders from "../pages/customer/ScheduledOrders";

import TableReservation from "../pages/customer/TableReservation";
import GroupCart from "../pages/customer/GroupCart";
import GroupOrders from "../pages/customer/GroupOrders";
import GroupPayment from "../pages/customer/GroupPayment";

import TrackOrder from "../pages/customer/TrackOrder";
import Review from "../pages/customer/Review";
import RestaurantReviews from "../pages/customer/RestaurantReviews";

import DeliveryTracking from "../pages/customer/DeliveryTracking";
import Notifications from "../pages/customer/Notifications";

import MembershipPlans from "../pages/customer/MembershipPlans";



// ADMIN
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminRestaurants from "../pages/admin/AdminRestaurants";
import ReportsAnalytics from "../pages/admin/ReportsAnalytics";
import RefundManagement from "../pages/admin/RefundManagement";
import BusinessDashboard from "../pages/admin/BusinessDashboard";
import VerificationManagement from "../pages/admin/VerificationManagement";
import AuditLogs from "../pages/admin/AuditLogs";
import SecurityMonitor from "../pages/admin/SecurityMonitor";
import AdminBranches from "../pages/admin/AdminBranches";
import SystemSettings from "../pages/admin/SystemSettings";
import RouteOptimization from "../pages/admin/RouteOptimization";
import SmartDeliveryDashboard from "../pages/admin/SmartDeliveryDashboard";



// DELIVERY
import DeliveryDashboard from "../pages/delivery/DeliveryDashboard";
import DeliveryEarningsDashboard from "../pages/delivery/DeliveryEarningsDashboard";



// RESTAURANT
import RestaurantDashboard from "../pages/restaurant/RestaurantDashboard";
import MyRestaurant from "../pages/restaurant/MyRestaurant";
import RestaurantSettings from "../pages/restaurant/RestaurantSettings";
import Menu from "../pages/restaurant/Menu";
import InventoryManagement from "../pages/restaurant/InventoryManagement";
import KitchenDashboard from "../pages/restaurant/KitchenDashboard";
import RestaurantPerformanceDashboard from "../pages/restaurant/RestaurantPerformanceDashboard";
import AIDemandDashboard from "../pages/restaurant/AIDemandDashboard";
import SmartInventoryDashboard from "../pages/restaurant/SmartInventoryDashboard";
import StaffManagementDashboard from "../pages/restaurant/StaffManagementDashboard";
import AIRecommendationDashboard from "../pages/customer/AIRecommendationDashboard";
import FinancialDashboard from "../pages/restaurant/FinancialDashboard";


function AppRoutes(){

return (

<Routes>


{/* PUBLIC */}

<Route
path="/"
element={<Login />}
/>


<Route
path="/register"
element={<Register />}
/>



{/* CUSTOMER */}


<Route
path="/customer/dashboard"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<CustomerDashboard />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/ai-recommendations"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<AIRecommendationDashboard />

</CustomerLayout>

</ProtectedRoute>
}
/>





<Route
path="/customer/home"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Home />

</CustomerLayout>

</ProtectedRoute>
}
/>


<Route
path="/customer/profile"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Profile />

</CustomerLayout>

</ProtectedRoute>
}
/>


{/* CUSTOMER FEATURES */}


<Route
path="/customer/menu"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<CustomerMenu />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/cart"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Cart />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/checkout"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Checkout />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/orders"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Orders />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/favorites"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Favorites />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/preferences"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Preferences />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/payment"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Payment />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/payment-history"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<PaymentHistory />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/wallet"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Wallet />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/wallet-transactions"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<WalletTransactions />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/coupons"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Coupons />

</CustomerLayout>

</ProtectedRoute>
}
/>

// CUSTOMER COMMUNICATION


<Route
path="/customer/chat"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Chat />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/support-chat"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<SupportChat />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/ai-recommendations"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<AIRecommendations />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/ai-chatbot"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<AIChatbot />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/notifications"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Notifications />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/track-order/:id"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<TrackOrder />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/review"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<Review />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/customer/reviews"
element={
<ProtectedRoute allowedRoles={["CUSTOMER"]}>

<CustomerLayout>

<RestaurantReviews />

</CustomerLayout>

</ProtectedRoute>
}
/>



{/* ADVANCED CUSTOMER MODULES */}



<Route
path="/scheduled-orders"
element={
<ProtectedRoute>

<CustomerLayout>

<ScheduledOrders />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/table-reservation"
element={
<ProtectedRoute>

<CustomerLayout>

<TableReservation />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/group-cart"
element={
<ProtectedRoute>

<CustomerLayout>

<GroupCart />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/group-orders"
element={
<ProtectedRoute>

<CustomerLayout>

<GroupOrders />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/group-payment"
element={
<ProtectedRoute>

<CustomerLayout>

<GroupPayment />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/membership-plans"
element={
<ProtectedRoute>

<CustomerLayout>

<MembershipPlans />

</CustomerLayout>

</ProtectedRoute>
}
/>



<Route
path="/delivery-tracking"
element={
<ProtectedRoute>

<CustomerLayout>

<DeliveryTracking />

</CustomerLayout>

</ProtectedRoute>
}
/>


// ================= ADMIN =================


<Route
path="/admin/dashboard"
element={
<ProtectedRoute allowedRoles={["ADMIN"]}>

<AdminDashboard />

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
path="/admin/restaurants"
element={
<ProtectedRoute allowedRoles={["ADMIN"]}>

<AdminRestaurants />

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
path="/admin/refunds"
element={
<ProtectedRoute allowedRoles={["ADMIN"]}>

<RefundManagement />

</ProtectedRoute>
}
/>



<Route
path="/admin/business-dashboard"
element={<BusinessDashboard />}
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
path="/admin/audit-logs"
element={<AuditLogs />}
/>



<Route
path="/admin/security-monitor"
element={<SecurityMonitor />}
/>



<Route
path="/admin/branches"
element={<AdminBranches />}
/>



<Route
path="/admin/system-settings"
element={<SystemSettings />}
/>



<Route
path="/route-optimization"
element={
<ProtectedRoute>

<RouteOptimization />

</ProtectedRoute>
}
/>



<Route
path="/smart-delivery"
element={
<ProtectedRoute>

<SmartDeliveryDashboard />

</ProtectedRoute>
}
/>


// ================= DELIVERY PARTNER =================



<Route
path="/delivery/dashboard"
element={
<ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]}>

<DeliveryDashboard />

</ProtectedRoute>
}
/>


<Route
path="/delivery-earnings"
element={
<ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]}>

<DeliveryEarningsDashboard />

</ProtectedRoute>
}
/>


</Routes>

);

}


export default AppRoutes;