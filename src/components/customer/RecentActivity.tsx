
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Package, CreditCard, CheckCircle } from "lucide-react";
import { CustomerProfile } from "@/types/customer";

interface RecentActivityProps {
  profile: CustomerProfile;
  formatDate: (date: Date | null) => string;
}

// Mock recent activities for demonstration
const mockActivities = [
  {
    id: 1,
    type: "order_shipped",
    message: "Your order #1234 has been shipped",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    icon: Package,
    color: "text-blue-500",
    bgColor: "bg-blue-100"
  },
  {
    id: 2,
    type: "payment_received",
    message: "Payment of $250.00 received",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    icon: CreditCard,
    color: "text-green-500",
    bgColor: "bg-green-100"
  },
  {
    id: 3,
    type: "account_verified",
    message: "Your account has been verified",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    icon: CheckCircle,
    color: "text-purple-500",
    bgColor: "bg-purple-100"
  }
];

export const RecentActivity = ({ profile, formatDate }: RecentActivityProps) => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <span className="text-xs text-muted-foreground">Last 7 days</span>
        </div>
      </CardHeader>
      <CardContent>
        {mockActivities.length > 0 ? (
          <div className="space-y-4">
            {mockActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${activity.bgColor} flex-shrink-0 mt-0.5`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-6">No recent activity</p>
        )}
      </CardContent>
    </Card>
  );
};
