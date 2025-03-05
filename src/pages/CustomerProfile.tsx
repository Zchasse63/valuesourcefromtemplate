
import { useCustomerProfile, useCustomerSummary } from "@/hooks/useCustomerApi";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { ProfileInformation } from "@/components/customer/ProfileInformation";
import { SalespersonCard } from "@/components/customer/SalespersonCard";
import { CustomerMetrics } from "@/components/customer/CustomerMetrics";
import { AddressCards } from "@/components/customer/AddressCards";
import { RecentActivity } from "@/components/customer/RecentActivity";
import { formatCurrency, formatDate } from "@/utils/chartUtils";

const CustomerProfile = () => {
  const { data: profile, isLoading: profileLoading } = useCustomerProfile();
  const { data: summary, isLoading: summaryLoading } = useCustomerSummary();

  if (profileLoading || summaryLoading) {
    return <div className="space-y-8">
      <div className="h-8 w-64 bg-muted/50 animate-pulse rounded-md"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 bg-muted/50 animate-pulse rounded-lg"></div>
        <div className="h-64 bg-muted/50 animate-pulse rounded-lg"></div>
      </div>
    </div>;
  }

  if (!profile || !summary) {
    return <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Profile not found</h1>
      <p>Unable to load customer profile. Please try again later.</p>
    </div>;
  }

  return (
    <div className="space-y-8">
      <CustomerHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileInformation profile={profile} formatDate={formatDate} />
        <div className="space-y-6">
          <SalespersonCard salesperson={profile.assignedSalesperson} />
          <RecentActivity profile={profile} formatDate={formatDate} />
        </div>
      </div>

      <CustomerMetrics 
        summary={summary} 
        formatCurrency={formatCurrency} 
        formatDate={formatDate} 
      />

      <AddressCards profile={profile} />
    </div>
  );
};

export default CustomerProfile;
