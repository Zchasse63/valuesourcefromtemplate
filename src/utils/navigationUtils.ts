
import { 
  LayoutDashboard, 
  BarChart3, 
  Receipt, 
  Settings, 
  Bell, 
  User, 
  Users,
  DollarSign,
  LineChart,
  LucideIcon,
  CreditCard,
  HelpCircle,
  FileText
} from "lucide-react";
import { User as UserType } from "@/types/auth";

/**
 * Navigation item definition
 */
export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

/**
 * Generates navigation items based on user role
 * 
 * Following the principle of user-centric design by adapting navigation
 * based on the user's permissions and needs.
 * 
 * @param {UserType | null} user - Current user information
 * @returns {NavItem[]} Array of navigation items for the sidebar
 */
export const getNavItems = (user: UserType | null): NavItem[] => {
  // Common items that all authenticated users can access
  const commonItems: NavItem[] = [
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
        name: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        name: "Sales",
        href: "/admin/sales",
        icon: DollarSign,
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
  } else if (user?.role === "salesperson") {
    return [
      {
        name: "Dashboard",
        href: "/sales",
        icon: LayoutDashboard,
      },
      {
        name: "Team",
        href: "/sales/team",
        icon: Users,
      },
      {
        name: "Customers",
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
        icon: LineChart,
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
  } else if (user?.role === "customer") {
    return [
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
        icon: FileText,
      },
      {
        name: "Billing",
        href: "/customer/billing",
        icon: CreditCard,
      },
      {
        name: "Support",
        href: "/customer/support",
        icon: HelpCircle,
      },
      {
        name: "Notifications",
        href: "/customer/notifications",
        icon: Bell,
      },
      {
        name: "Settings",
        href: "/customer/settings",
        icon: Settings,
      },
    ];
  }

  return commonItems;
};
