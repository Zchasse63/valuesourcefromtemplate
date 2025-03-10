
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NavItem from "@/components/sidebar/NavItem";
import UserProfile from "@/components/sidebar/UserProfile";
import { 
  LayoutDashboard, 
  Receipt, 
  Users,
  Settings, 
  Bell,
  BarChart
} from "lucide-react";

/**
 * Sales-specific sidebar with navigation items for the sales portal
 */
const SalesSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const salesNavItems = [
    {
      name: "Dashboard",
      href: "/sales",
      icon: LayoutDashboard,
    },
    {
      name: "My Customers",
      href: "/sales/customers",
      icon: Users,
    },
    {
      name: "Transactions",
      href: "/sales/transactions",
      icon: Receipt,
    },
    {
      name: "Performance",
      href: "/sales/performance",
      icon: BarChart,
    },
    {
      name: "Notifications",
      href: "/sales/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      href: "/sales/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-primary">Sales Portal</h1>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="space-y-1 px-3">
            {salesNavItems.map((item) => (
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

export default SalesSidebar;
