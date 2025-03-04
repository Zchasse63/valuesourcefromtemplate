
import { Card } from "@/components/ui/card";
import { useSalespersonCustomers } from "@/hooks/useCustomerApi";
import { Building, Phone, User, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const { data: customers, isLoading } = useSalespersonCustomers();

  if (isLoading) {
    return <div className="space-y-8">
      <div className="h-8 w-64 bg-muted/50 animate-pulse rounded-md"></div>
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-muted/50 animate-pulse rounded-lg"></div>
        ))}
      </div>
    </div>;
  }

  if (!customers || customers.length === 0) {
    return <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">No Customers</h1>
      <p>You don't have any assigned customers yet.</p>
    </div>;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Your Customers</h1>
        <p className="text-secondary-foreground">View and manage your assigned customers</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {customers.map(customer => (
          <Card key={customer.id} className="glass-card p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {customer.user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{customer.user.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.company}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.user.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.contactPhone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.company}</span>
                  </div>
                </div>
              </div>
              
              <Link 
                to={`/customers/${customer.id}`} 
                className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
