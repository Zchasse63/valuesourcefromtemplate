
import { useState } from "react";
import { 
  Bell,
  Check,
  Clock,
  CreditCard,
  FileText,
  MessageSquare,
  Package,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "billing" | "support" | "system";
  read: boolean;
  timestamp: Date;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Order Shipped",
    message: "Your order #12345 has been shipped and is on its way.",
    type: "order",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Payment for invoice #INV-001 has been processed successfully.",
    type: "billing",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    title: "Support Ticket Update",
    message: "Your support ticket #45678 has been resolved.",
    type: "support",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return <Package className="h-5 w-5" />;
    case "billing":
      return <CreditCard className="h-5 w-5" />;
    case "support":
      return <MessageSquare className="h-5 w-5" />;
    case "system":
      return <Bell className="h-5 w-5" />;
  }
};

const NotificationsManager = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { toast } = useToast();

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Your recent notifications and updates</CardDescription>
        </div>
        {notifications.some(n => !n.read) && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No notifications to display
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
                  notification.read ? 'bg-background' : 'bg-muted'
                }`}
              >
                <div className={`text-${notification.type === 'billing' ? 'green' : 'blue'}-500`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{notification.title}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsManager;
