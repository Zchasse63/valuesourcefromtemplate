
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChartProvider } from "@/contexts/ChartContext";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

// Create a client with improved error handling and caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AccessibilityProvider>
            <ChartProvider>
              <DashboardProvider>
                <AppRoutes />
                <Toaster />
              </DashboardProvider>
            </ChartProvider>
          </AccessibilityProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
