
import { 
  LayoutDashboard, 
  BarChart3, 
  Receipt, 
  Settings, 
  Bell, 
  User, 
  Users,
  LucideIcon
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
