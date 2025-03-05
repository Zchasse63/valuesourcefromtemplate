
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { UserRole } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";

/**
 * Signup page component
 * 
 * Implements CodeFarm principles:
 * - User-Centric Design: Provides clear feedback during account creation
 * - Sustainable Code: Handles errors gracefully
 * - Modular Architecture: Separates authentication logic from UI
 * 
 * @component
 * @returns {JSX.Element} Rendered signup page
 */
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    // Basic validation
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }
    
    try {
      await signup(email, password, name, role);
      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      });
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to create account. Please try again.";
      
      setFormError(errorMessage);
      
      toast({
        title: "Signup failed",
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
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>
          <p className="text-secondary-foreground">Join our platform today</p>
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
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg border border-input bg-white px-10 py-2 text-sm"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                aria-invalid={formError ? "true" : "false"}
              />
            </div>
          </div>

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
                aria-describedby="password-requirements"
                aria-invalid={formError ? "true" : "false"}
              />
            </div>
            <p id="password-requirements" className="text-xs text-muted-foreground">
              Password must be at least 6 characters long
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Account Type</label>
            <select
              className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm"
              value={role}
              onChange={e => setRole(e.target.value as UserRole)}
              required
            >
              <option value="customer">Customer</option>
              <option value="salesperson">Salesperson</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <div className="mt-4 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
