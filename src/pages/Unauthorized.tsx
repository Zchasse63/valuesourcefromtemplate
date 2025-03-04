
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Unauthorized = () => {
  const { user } = useAuth();

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
