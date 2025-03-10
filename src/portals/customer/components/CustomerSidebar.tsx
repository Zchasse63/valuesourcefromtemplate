
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NavItem from "@/components/sidebar/NavItem";
import UserProfile from "@/components/sidebar/UserProfile";
import { 
  LayoutDashboard, 
  Receipt, 
  User,
  Settings, 
  Bell,
  CreditCard,
  HelpCircle
} from "lucide-react";

/**
 * Customer-specific sidebar with navigation items for the customer portal
 */
const CustomerSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const customerNavItems = [
    {
      name: "Dashboard",
      href: "/customer",
      icon: LayoutDashboard,
    },
    {
      name: "My Profile",
      href: "/customer/profile",
      icon: User,
    },
    {
      name: "My Orders",
      href: "/customer/orders",
      icon: Receipt,
    },
    {
      name: "Billing",
      href: "/customer/billing",
      icon: CreditCard,
    },
    {
      name: "Notifications",
      href: "/customer/notifications",
      icon: Bell,
    },
    {
      name: "Support",
      href: "/customer/support",
      icon: HelpCircle,
    },
    {
      name: "Settings",
      href: "/customer/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-primary">Customer Portal</h1>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="space-y-1 px-3">
            {customerNavItems.map((item) => (
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

export default CustomerSidebar;
