
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Unauthorized from "@/pages/Unauthorized";
import { useAuth } from "@/contexts/AuthContext";

// Admin Portal
import AdminPortal from "@/portals/admin/AdminPortal";
import Analytics from "@/pages/Analytics";
import AdminDashboard from "@/pages/admin/Dashboard";
import SalesTeam from "@/pages/admin/SalesTeam";
import AdminCustomers from "@/pages/admin/Customers";
import CustomerDetail from "@/pages/CustomerDetail"; // Import from the correct location
import Transactions from "@/pages/Transactions"; // Import from the correct location
import AdminSettings from "@/pages/admin/Settings";
import AdminNotifications from "@/pages/admin/Notifications";

// Sales Portal
import SalesPortal from "@/portals/sales/SalesPortal";
import SalesDashboard from "@/pages/sales/Dashboard";
import CustomerList from "@/pages/CustomerList";
import SalesPerformance from "@/pages/sales/Performance";
import SalesSettings from "@/pages/sales/Settings";
import SalesNotifications from "@/pages/sales/Notifications";

// Customer Portal
import CustomerPortal from "@/portals/customer/CustomerPortal";
import CustomerDashboard from "@/pages/customer/Dashboard";
import CustomerProfile from "@/pages/CustomerProfile";
import CustomerOrders from "@/pages/customer/Orders";
import CustomerBilling from "@/pages/customer/Billing";
import CustomerSupport from "@/pages/customer/Support";
import CustomerSettings from "@/pages/customer/Settings";
import CustomerNotifications from "@/pages/customer/Notifications";

// Create placeholder pages for any missing components
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-500">This page is under development</p>
  </div>
);

const AppRoutes = () => {
  const { user } = useAuth();

  // Redirect to the appropriate portal based on user role
  const getHomeRedirect = () => {
    if (!user) return "/login";
    
    switch (user.role) {
      case "admin": return "/admin";
      case "salesperson": return "/sales";
      case "customer": return "/customer";
      default: return "/login";
    }
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Redirect base path to appropriate portal */}
      <Route path="/" element={<Navigate to={getHomeRedirect()} replace />} />
      
      {/* Legacy route for backwards compatibility */}
      <Route element={<ProtectedRoute />}>
        <Route path="/index" element={<Index />} />
      </Route>
      
      {/* Admin Portal Routes */}
      <Route path="/admin" element={<AdminPortal />}>
        <Route index element={<AdminDashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="salesteam" element={
          <PlaceholderPage title="Sales Team Management" />
        } />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="customers/:customerId" element={<CustomerDetail />} /> {/* Use the shared CustomerDetail component */}
        <Route path="transactions" element={<Transactions />} /> {/* Use the shared Transactions component */}
        <Route path="settings" element={<AdminSettings />} />
        <Route path="notifications" element={<AdminNotifications />} />
      </Route>
      
      {/* Sales Portal Routes */}
      <Route path="/sales" element={<SalesPortal />}>
        <Route index element={<SalesDashboard />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/:customerId" element={<CustomerDetail />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="performance" element={<SalesPerformance />} />
        <Route path="settings" element={<SalesSettings />} />
        <Route path="notifications" element={<SalesNotifications />} />
      </Route>
      
      {/* Customer Portal Routes */}
      <Route path="/customer" element={<CustomerPortal />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="billing" element={<CustomerBilling />} />
        <Route path="support" element={<CustomerSupport />} />
        <Route path="settings" element={<CustomerSettings />} />
        <Route path="notifications" element={<CustomerNotifications />} />
      </Route>
      
      {/* Catch all routes and redirect to appropriate home */}
      <Route path="*" element={<Navigate to={getHomeRedirect()} replace />} />
    </Routes>
  );
};

export default AppRoutes;
