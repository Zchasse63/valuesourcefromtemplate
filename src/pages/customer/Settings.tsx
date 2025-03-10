
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const CustomerSettings = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
        <SettingsIcon className="h-8 w-8" />
        Account Settings
      </h1>
      <p className="text-secondary-foreground">Manage your account preferences and settings.</p>

      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Portal Settings</h2>
        <p className="text-gray-500">This page is under development.</p>
      </Card>
    </div>
  );
};

export default CustomerSettings;
