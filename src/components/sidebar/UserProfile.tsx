
import { LogOut, User as UserIcon } from "lucide-react";
import { User } from "@/types/auth";

interface UserProfileProps {
  user: User | null;
  onLogout: () => void;
}

/**
 * User profile component for the sidebar
 * 
 * Displays user information and logout button
 * 
 * @component
 * @param {UserProfileProps} props - Component properties
 * @param {User | null} props.user - Current user information
 * @param {Function} props.onLogout - Logout handler function
 * @returns {JSX.Element} Rendered user profile section
 */
const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
          {user?.name ? user.name.charAt(0) : "U"}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role || "Guest"}</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        aria-label="Logout"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  );
};

export default UserProfile;
