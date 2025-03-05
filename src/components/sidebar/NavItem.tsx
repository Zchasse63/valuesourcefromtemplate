
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  name: string;
  isActive: boolean;
}

/**
 * Navigation item component for the sidebar
 * 
 * @component
 * @param {NavItemProps} props - Component properties
 * @param {string} props.href - Navigation link destination
 * @param {LucideIcon} props.icon - Icon to display before the name
 * @param {string} props.name - Display text for the navigation item
 * @param {boolean} props.isActive - Whether this item is currently active
 * @returns {JSX.Element} Rendered navigation item
 */
const NavItem = ({ href, icon: Icon, name, isActive }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="h-5 w-5 mr-2" />
      {name}
    </Link>
  );
};

export default NavItem;
