
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart3, 
  Receipt, 
  Settings, 
  Bell, 
  User, 
  LogOut,
  Users
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      {
        name: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        name: "Profile",
        href: "/profile",
        icon: User,
      },
      {
        name: "Notifications",
        href: "/notifications",
        icon: Bell,
      },
      {
        name: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ];

    // Role-specific items
    if (user?.role === "admin") {
      return [
        ...commonItems,
        {
          name: "Analytics",
          href: "/analytics",
          icon: BarChart3,
        },
        {
          name: "Customers",
          href: "/customers",
          icon: Users,
        },
        {
          name: "Transactions",
          href: "/transactions",
          icon: Receipt,
        },
      ];
    } else if (user?.role === "salesperson") {
      return [
        ...commonItems,
        {
          name: "Customers",
          href: "/customers",
          icon: Users,
        },
        {
          name: "Transactions",
          href: "/transactions",
          icon: Receipt,
        },
      ];
    } else if (user?.role === "customer") {
      return [
        ...commonItems,
        {
          name: "My Profile",
          href: "/customer-profile",
          icon: User,
        },
      ];
    }

    return commonItems;
  };

  const navItems = getNavItems();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-primary">Pallet Pro</h1>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role || "Guest"}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
