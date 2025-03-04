
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "@/pages/Index";
import Analytics from "@/pages/Analytics";
import Transactions from "@/pages/Transactions";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Unauthorized from "@/pages/Unauthorized";
import Profile from "@/pages/Profile";
import CustomerProfile from "@/pages/CustomerProfile";
import CustomerList from "@/pages/CustomerList";
import CustomerDetail from "@/pages/CustomerDetail";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected routes for all authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      
      {/* Customer-specific routes */}
      <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
        <Route path="/customer-profile" element={<CustomerProfile />} />
      </Route>
      
      {/* Salesperson-specific routes */}
      <Route element={<ProtectedRoute allowedRoles={["salesperson", "admin"]} />}>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:customerId" element={<CustomerDetail />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
      
      {/* Admin-specific routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/analytics" element={<Analytics />} />
      </Route>
      
      {/* Default routes */}
      <Route path="/" element={<Index />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
