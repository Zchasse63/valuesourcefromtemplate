
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const SalesSettings = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
        <SettingsIcon className="h-8 w-8" />
        Sales Settings
      </h1>
      <p className="text-secondary-foreground">Configure your sales portal preferences.</p>

      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Portal Settings</h2>
        <p className="text-gray-500">This page is under development.</p>
      </Card>
    </div>
  );
};

export default SalesSettings;
