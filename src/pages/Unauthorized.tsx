
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft, User, PieChart, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Unauthorized = () => {
  const { user } = useAuth();

  // Define available pages based on user role
  const getAvailablePages = () => {
    switch (user?.role) {
      case "customer":
        return [
          { icon: User, name: "Profile", path: "/profile" },
          { icon: CreditCard, name: "Orders", path: "/" },
        ];
      case "salesperson":
        return [
          { icon: User, name: "Profile", path: "/profile" },
          { icon: CreditCard, name: "Transactions", path: "/transactions" },
        ];
      case "admin":
        return [
          { icon: User, name: "Profile", path: "/profile" },
          { icon: PieChart, name: "Analytics", path: "/analytics" },
          { icon: CreditCard, name: "Transactions", path: "/transactions" },
        ];
      default:
        return [];
    }
  };

  const availablePages = getAvailablePages();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="glass-card w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <Shield className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-primary">Access Denied</h1>
        <p className="mb-6 text-secondary-foreground">
          Sorry, you don't have permission to access this page.
          {user && <span> Your current role is <strong>{user.role}</strong>.</span>}
        </p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Available pages for your role:</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {availablePages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 font-medium text-primary hover:bg-primary/20 transition-all"
              >
                <page.icon className="h-4 w-4" />
                {page.name}
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Go to Dashboard
        </Link>
      </Card>
    </div>
  );
};

export default Unauthorized;
