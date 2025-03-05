
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NavItem from "./sidebar/NavItem";
import UserProfile from "./sidebar/UserProfile";
import { getNavItems } from "@/utils/navigationUtils";

/**
 * Main sidebar component for the application
 * 
 * Implements the CodeFarm principles:
 * - Modular Design: Split into smaller, focused components
 * - User-Centric Design: Adapts navigation based on user role
 * - Sustainable Code: Reusable components with clear responsibilities
 * 
 * @component
 * @returns {JSX.Element} Rendered sidebar
 */
const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = getNavItems(user);

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-primary">Pallet Pro</h1>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                name={item.name}
                isActive={location.pathname === item.href}
              />
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <UserProfile user={user} onLogout={logout} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
