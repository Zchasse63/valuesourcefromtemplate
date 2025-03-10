
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import CustomerSidebar from "./components/CustomerSidebar";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { AccessibilityControls } from "@/components/ui/AccessibilityControls";

/**
 * Customer Portal - Main layout container for all customer pages
 * Customers can view their own information, orders, and account settings.
 * This is a demo portal, but will be replicated for hundreds of customers.
 */
const CustomerPortal = () => {
  const { user } = useAuth();
  
  // If not customer, redirect to unauthorized
  if (user?.role !== "customer") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <ErrorBoundary componentName="CustomerPortal">
      <div className="flex min-h-screen bg-background">
        {/* Skip to content link for keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        
        <CustomerSidebar />
        
        <main id="main-content" className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-green-900/10 text-green-700 text-sm">
              Customer Portal
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

export default CustomerPortal;
