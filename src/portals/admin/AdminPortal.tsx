
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { AccessibilityControls } from "@/components/ui/AccessibilityControls";

/**
 * Admin Portal - Main layout container for all admin pages
 * Admins have full access to the system, including analytics,
 * all customer data, and sales team management.
 */
const AdminPortal = () => {
  const { user } = useAuth();
  
  // If not admin, redirect to unauthorized
  if (user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <ErrorBoundary componentName="AdminPortal">
      <div className="flex min-h-screen bg-background">
        {/* Skip to content link for keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        
        <AdminSidebar />
        
        <main id="main-content" className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-primary-900/10 text-primary-900 text-sm">
              Admin Portal
            </div>
            <Outlet />
          </div>
        </main>
        
        {/* Accessibility controls */}
        <AccessibilityControls />
      </div>
    </ErrorBoundary>
  );
};

export default AdminPortal;
