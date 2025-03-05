
import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Higher-order component to provide toast to class component
const withToast = (WrappedComponent: any) => {
  return (props: any) => {
    const toastHelpers = useToast();
    return <WrappedComponent {...props} toast={toastHelpers} />;
  };
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  toast?: ReturnType<typeof useToast>;
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryBase extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Use toast if available
    const { toast, componentName } = this.props;
    if (toast) {
      toast.error({
        title: `Error in ${componentName || 'component'}`,
        description: error.message || 'An unexpected error occurred',
      });
    }
    
    // In a production app, you might want to log to a service like Sentry
    // If available, logErrorToService(error, errorInfo, componentName);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <h3 className="text-lg font-semibold text-red-800">Something went wrong</h3>
            <p className="text-sm text-red-600 max-w-md">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              className="mt-4 inline-flex items-center gap-1 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              onClick={this.handleReset}
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withToast(ErrorBoundaryBase);

// Helper hook to create component-specific error boundaries
export const useComponentErrorBoundary = (componentName: string) => {
  const WrapWithErrorBoundary = ({ children, onReset }: { children: ReactNode, onReset?: () => void }) => (
    <ErrorBoundary componentName={componentName} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
  
  return { WrapWithErrorBoundary };
};
