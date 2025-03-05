
import { Card } from "@/components/ui/card";
import { Building, Phone, User, Mail, Calendar } from "lucide-react";
import { CustomerProfile } from "@/types/customer";

interface ProfileInformationProps {
  profile: CustomerProfile;
  formatDate: (date: Date | null) => string;
}

export const ProfileInformation = ({ profile, formatDate }: ProfileInformationProps) => {
  return (
    <Card className="glass-card p-6 md:col-span-2">
      <h3 className="text-lg font-semibold mb-4">General Information</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium">{profile.user.name}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Building className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Company</p>
            <p className="font-medium">{profile.company}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{profile.user.email}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{profile.contactPhone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Customer Since</p>
            <p className="font-medium">{formatDate(profile.createdAt)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
