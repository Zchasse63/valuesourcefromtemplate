
import { Card } from "@/components/ui/card";
import { useCustomerProfile, useCustomerSummary } from "@/hooks/useCustomerApi";
import { useParams, Link } from "react-router-dom";
import { Building, Phone, User, Mail, MapPin, Calendar, DollarSign, Package, ArrowLeft } from "lucide-react";

const CustomerDetail = () => {
  const { customerId } = useParams<{ customerId: string }>();
  // Note: In a real app, these hooks would be modified to accept a customer ID parameter
  // For this demo, we'll use the same hooks but in a real app they'd be different
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
      <h1 className="text-4xl font-bold text-primary">Customer not found</h1>
      <p>Unable to load customer details. Please try again later.</p>
      <Link to="/customers" className="inline-flex items-center text-primary hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to customer list
      </Link>
    </div>;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: Date | null) => {
    return date 
      ? new Intl.DateTimeFormat('en-US', { 
          dateStyle: 'medium' 
        }).format(date)
      : 'N/A';
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <Link to="/customers" className="inline-flex items-center text-primary hover:underline mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to customer list
          </Link>
          <h1 className="text-4xl font-bold text-primary">{profile.user.name}</h1>
          <p className="text-secondary-foreground">{profile.company}</p>
        </div>
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
          {profile.user.name.charAt(0)}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <h2 className="text-2xl font-bold">{summary.totalOrders}</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <h2 className="text-2xl font-bold">{formatCurrency(summary.totalSpent)}</h2>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Order</p>
              <h2 className="text-2xl font-bold">{formatCurrency(summary.averageOrderValue)}</h2>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Last Order</p>
              <h2 className="text-2xl font-bold">{formatDate(summary.lastOrderDate)}</h2>
            </div>
            <div className="p-2 bg-amber-100 rounded-full">
              <Calendar className="h-4 w-4 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
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

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>
          <div className="space-y-3">
            <Link 
              to={`/orders/new?customerId=${customerId}`}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Create Order
            </Link>
            <Link 
              to={`/customers/${customerId}/orders`}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-2 font-medium text-primary hover:bg-primary/20"
            >
              View Orders
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Default Shipping Address</h3>
          {profile.shippingAddresses.find(a => a.isDefault) ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">
                    {profile.shippingAddresses.find(a => a.isDefault)?.street}
                  </p>
                  <p className="text-muted-foreground">
                    {`${profile.shippingAddresses.find(a => a.isDefault)?.city}, 
                    ${profile.shippingAddresses.find(a => a.isDefault)?.state} 
                    ${profile.shippingAddresses.find(a => a.isDefault)?.zipCode}`}
                  </p>
                  <p className="text-muted-foreground">
                    {profile.shippingAddresses.find(a => a.isDefault)?.country}
                  </p>
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
    </div>
  );
};

export default CustomerDetail;
