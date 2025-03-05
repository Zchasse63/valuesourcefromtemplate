
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { CustomerProfile } from "@/types/customer";

interface AddressCardsProps {
  profile: CustomerProfile;
}

export const AddressCards = ({ profile }: AddressCardsProps) => {
  const defaultShippingAddress = profile.shippingAddresses.find(a => a.isDefault);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Default Shipping Address</h3>
        {defaultShippingAddress ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">{defaultShippingAddress.street}</p>
                <p className="text-muted-foreground">
                  {`${defaultShippingAddress.city}, 
                  ${defaultShippingAddress.state} 
                  ${defaultShippingAddress.zipCode}`}
                </p>
                <p className="text-muted-foreground">{defaultShippingAddress.country}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No shipping address has been set.</p>
        )}
      </Card>
      
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">{profile.billingAddress.street}</p>
              <p className="text-muted-foreground">
                {`${profile.billingAddress.city}, 
                ${profile.billingAddress.state} 
                ${profile.billingAddress.zipCode}`}
              </p>
              <p className="text-muted-foreground">{profile.billingAddress.country}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
