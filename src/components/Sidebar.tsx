
import { Home, PieChart, Settings, User, CreditCard, Bell, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

interface MenuItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
  allowedRoles: UserRole[];
}

const menuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", path: "/", allowedRoles: ["customer", "salesperson", "admin"] },
  { icon: PieChart, label: "Analytics", path: "/analytics", allowedRoles: ["admin"] },
  { icon: CreditCard, label: "Transactions", path: "/transactions", allowedRoles: ["salesperson", "admin"] },
  { icon: Bell, label: "Notifications", path: "/notifications", allowedRoles: ["customer", "salesperson", "admin"] },
  { icon: User, label: "Profile", path: "/profile", allowedRoles: ["customer", "salesperson", "admin"] },
  { icon: Settings, label: "Settings", path: "/settings", allowedRoles: ["admin"] },
];

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const visibleMenuItems = user 
    ? menuItems.filter(item => item.allowedRoles.includes(user.role))
    : [];

  return (
    <div className="fixed left-0 top-0 h-full w-64 glass-card border-r border-white/10">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">Finance</h2>
        </div>
        
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      "hover:bg-white/10",
                      isActive ? "bg-white/10" : "text-secondary"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3">
                <User className="h-8 w-8 rounded-full bg-accent p-1" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-secondary">{user.role}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-lg mt-2 text-secondary hover:bg-white/10 transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3">
              <Link
                to="/login"
                className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
