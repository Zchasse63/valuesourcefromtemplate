
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Login page component
 * 
 * Implements CodeFarm principles:
 * - User-Centric Design: Provides clear feedback on login attempts
 * - Sustainable Code: Handles errors gracefully
 * - Modular Architecture: Separates authentication logic from UI
 * 
 * @component
 * @returns {JSX.Element} Rendered login page
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to sign in. Please check your credentials.";
      
      setFormError(errorMessage);
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="glass-card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="text-secondary-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="bg-destructive/10 text-destructive rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span className="text-sm">{formError}</span>
            </div>
          )}

          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-input bg-white px-10 py-2 text-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-invalid={formError ? "true" : "false"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-input bg-white px-10 py-2 text-sm"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                aria-invalid={formError ? "true" : "false"}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <div className="mt-4 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 border-t border-border pt-4 text-center text-sm text-muted-foreground">
            <p>Demo accounts:</p>
            <ul className="mt-2 space-y-1">
              <li>Customer: customer@example.com / password</li>
              <li>Salesperson: sales@example.com / password</li>
              <li>Admin: admin@example.com / password</li>
            </ul>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
