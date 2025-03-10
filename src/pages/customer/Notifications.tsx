
import { Bell } from "lucide-react";
import NotificationsManager from "@/components/notifications/NotificationsManager";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const CustomerNotifications = () => {
  return (
    <ErrorBoundary componentName="CustomerNotifications">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
          <Bell className="h-8 w-8" />
          Notifications
        </h1>
        <p className="text-secondary-foreground">Stay up to date with your account notifications and alerts.</p>

        <NotificationsManager />
      </div>
    </ErrorBoundary>
  );
};

export default CustomerNotifications;
