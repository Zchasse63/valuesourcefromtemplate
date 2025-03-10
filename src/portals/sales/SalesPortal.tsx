
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import SalesSidebar from "./components/SalesSidebar";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { AccessibilityControls } from "@/components/ui/AccessibilityControls";

/**
 * Sales Portal - Main layout container for all sales team pages
 * Salespersons can manage their customers, view transactions,
 * and access their own performance metrics.
 */
const SalesPortal = () => {
  const { user } = useAuth();
  
  // If not salesperson, redirect to unauthorized
  if (user?.role !== "salesperson") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <ErrorBoundary componentName="SalesPortal">
      <div className="flex min-h-screen bg-background">
        {/* Skip to content link for keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        
        <SalesSidebar />
        
        <main id="main-content" className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-900/10 text-blue-700 text-sm">
              Sales Portal
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

export default SalesPortal;
