import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/admin/Dashboard";
import VerificationManagement from "../pages/admin/VerificationManagement";
import DeliveryDashboard from "../pages/delivery/DeliveryDashboard";
import RestaurantDashboard from "../pages/restaurant/Dashboard";
import MyRestaurant from "../pages/restaurant/MyRestaurant";
import RestaurantSettings from "../pages/restaurant/RestaurantSettings";
import Verification from "../pages/restaurant/Verification";
import VerificationStatus from "../pages/restaurant/VerificationStatus";
import Menu from "../pages/restaurant/Menu";

import Home from "../pages/customer/Home";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
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
        path="/restaurant/my-restaurant"
        element={
          <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
            <MyRestaurant />
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