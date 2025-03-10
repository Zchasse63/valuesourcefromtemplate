
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NavItem from "@/components/sidebar/NavItem";
import UserProfile from "@/components/sidebar/UserProfile";
import { 
  LayoutDashboard, 
  BarChart3,
  Receipt, 
  Users,
  Settings, 
  Bell
} from "lucide-react";

/**
 * Admin-specific sidebar with navigation items for the admin portal
 */
const AdminSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const adminNavItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Sales Team",
      href: "/admin/salesteam",
      icon: Users,
    },
    {
      name: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      name: "Transactions",
      href: "/admin/transactions",
      icon: Receipt,
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-primary">Admin Portal</h1>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="space-y-1 px-3">
            {adminNavItems.map((item) => (
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

export default AdminSidebar;
