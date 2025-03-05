
import { useAuth } from "@/contexts/AuthContext";

export const CustomerHeader = () => {
  const { user } = useAuth();
  
  return (
    <header className="space-y-2">
      <div className="flex items-center space-x-2">
        <h1 className="text-4xl font-bold text-primary">Customer Profile</h1>
        {user && (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
            {user.name.charAt(0)}
          </div>
        )}
      </div>
      <p className="text-secondary-foreground">Manage your account information and view order history</p>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Last login: {new Date().toLocaleString()}</span>
        <span>•</span>
        <span>Account in good standing</span>
      </div>
    </header>
  );
};
