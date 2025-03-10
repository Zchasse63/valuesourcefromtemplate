
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const NotificationPreferences = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "order-updates",
      title: "Order Updates",
      description: "Receive notifications about your order status changes",
      enabled: true,
    },
    {
      id: "billing-alerts",
      title: "Billing Alerts",
      description: "Get notified about payments and invoice updates",
      enabled: true,
    },
    {
      id: "support-messages",
      title: "Support Messages",
      description: "Receive updates on your support tickets",
      enabled: true,
    },
    {
      id: "product-updates",
      title: "Product Updates",
      description: "Stay informed about product changes and new features",
      enabled: false,
    },
    {
      id: "promotional",
      title: "Promotional Emails",
      description: "Receive special offers and promotional updates",
      enabled: false,
    },
  ]);

  const handleToggle = (settingId: string) => {
    setSettings(settings.map(setting => 
      setting.id === settingId 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  const handleSave = () => {
    // In a real app, this would call an API
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose which notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.id} className="flex items-start justify-between space-x-4">
              <div>
                <Label htmlFor={setting.id} className="text-base">
                  {setting.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {setting.description}
                </p>
              </div>
              <Switch
                id={setting.id}
                checked={setting.enabled}
                onCheckedChange={() => handleToggle(setting.id)}
              />
            </div>
          ))}
          <Button onClick={handleSave} className="w-full mt-6">
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPreferences;
