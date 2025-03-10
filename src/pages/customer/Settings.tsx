
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";
import ProfileSettingsForm from "@/components/customer/ProfileSettingsForm";
import NotificationPreferences from "@/components/settings/NotificationPreferences";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const CustomerSettings = () => {
  return (
    <ErrorBoundary componentName="CustomerSettings">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          Account Settings
        </h1>
        <p className="text-secondary-foreground">Manage your account preferences and settings.</p>

        <div className="grid gap-8">
          <ProfileSettingsForm />
          <NotificationPreferences />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CustomerSettings;
