
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

const CustomerNotifications = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
        <Bell className="h-8 w-8" />
        Notifications
      </h1>
      <p className="text-secondary-foreground">Your account notifications and alerts.</p>

      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Notifications</h2>
        <p className="text-gray-500">This page is under development.</p>
      </Card>
    </div>
  );
};

export default CustomerNotifications;
