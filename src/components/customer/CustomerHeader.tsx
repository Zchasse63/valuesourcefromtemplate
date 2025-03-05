
import { useAuth } from "@/contexts/AuthContext";

export const CustomerHeader = () => {
  return (
    <header>
      <h1 className="text-4xl font-bold text-primary">Customer Profile</h1>
      <p className="text-secondary-foreground">Manage your account information and view order history</p>
    </header>
  );
};
