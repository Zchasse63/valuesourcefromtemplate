
import { Card } from "@/components/ui/card";
import { Users, Search, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AdminCustomers = () => {
  // Mock customers data
  const customers = [
    { 
      id: "cust-001",
      name: "John Smith",
      company: "Smith Enterprises",
      email: "john@smith.com",
      status: "active",
      orders: 24,
      totalSpent: 68750,
      assignedTo: "Jane Doe"
    },
    { 
      id: "cust-002",
      name: "Sarah Johnson",
      company: "Johnson Industries",
      email: "sarah@johnson.com",
      status: "active",
      orders: 18,
      totalSpent: 42500,
      assignedTo: "Mike Wilson"
    },
    { 
      id: "cust-003",
      name: "James Williams",
      company: "Williams Co",
      email: "james@williams.com",
      status: "inactive",
      orders: 5,
      totalSpent: 12300,
      assignedTo: "Jane Doe"
    },
    { 
      id: "cust-004",
      name: "Lisa Brown",
      company: "Brown & Associates",
      email: "lisa@brown.com",
      status: "active",
      orders: 32,
      totalSpent: 96200,
      assignedTo: "Alex Turner"
    },
    { 
      id: "cust-005",
      name: "David Miller",
      company: "Miller Group",
      email: "david@miller.com",
      status: "active",
      orders: 15,
      totalSpent: 34800,
      assignedTo: "Mike Wilson"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
            <Users className="h-8 w-8" />
            Customers
          </h1>
          <p className="text-secondary-foreground">Manage all customer accounts and information.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search customers..."
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </header>

      <Card className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {formatCurrency(customer.totalSpent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link 
                      to={`/admin/customers/${customer.id}`} 
                      className="flex items-center gap-1 text-primary hover:text-primary/90 justify-end"
                    >
                      View
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminCustomers;
