
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import Sidebar from "@/components/Sidebar";
import { AccessibilityControls } from "@/components/ui/AccessibilityControls";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user's role is not included, redirect to unauthorized page
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and authorized
  return (
    <ErrorBoundary componentName="AppLayout">
      <div className="flex min-h-screen bg-background">
        {/* Skip to content link for keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        
        <Sidebar />
        <main id="main-content" className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Accessibility controls */}
        <AccessibilityControls />
      </div>
    </ErrorBoundary>
  );
};

export default ProtectedRoute;
