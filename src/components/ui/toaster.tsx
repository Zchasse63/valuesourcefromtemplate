
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Select the appropriate icon based on the toast variant
        let Icon = Info;
        
        if (variant === 'success') {
          Icon = CheckCircle;
        } else if (variant === 'warning') {
          Icon = AlertTriangle;
        } else if (variant === 'error') {
          Icon = XCircle;
        }
        
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-3">
              {variant && (
                <Icon className="h-5 w-5 shrink-0" />
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
