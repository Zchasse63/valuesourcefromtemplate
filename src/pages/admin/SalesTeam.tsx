
import { Card } from "@/components/ui/card";
import { Users, Search, Filter, ArrowRight, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const SalesTeam = () => {
  // Mock sales team data
  const salesTeam = [
    { 
      id: "sales-001",
      name: "Jane Doe",
      email: "jane@example.com",
      position: "Senior Sales Representative",
      customers: 37,
      revenue: 425000,
      performance: 106,
    },
    { 
      id: "sales-002",
      name: "Mike Wilson",
      email: "mike@example.com",
      position: "Sales Representative",
      customers: 28,
      revenue: 318000,
      performance: 98,
    },
    { 
      id: "sales-003",
      name: "Alex Turner",
      email: "alex@example.com",
      position: "Sales Representative",
      customers: 31,
      revenue: 392000,
      performance: 112,
    },
    { 
      id: "sales-004",
      name: "Emily Chen",
      email: "emily@example.com",
      position: "Junior Sales Representative",
      customers: 16,
      revenue: 183000,
      performance: 94,
    },
    { 
      id: "sales-005",
      name: "Robert Johnson",
      email: "robert@example.com",
      position: "Sales Manager",
      customers: 42,
      revenue: 520000,
      performance: 115,
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
            Sales Team
          </h1>
          <p className="text-secondary-foreground">Manage your sales representatives and their performance.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search team members..."
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-white">
            <UserPlus className="h-4 w-4" />
            Add Member
          </button>
        </div>
      </header>

      <Card className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {salesTeam.map(member => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.customers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {formatCurrency(member.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.performance >= 100 
                        ? 'bg-green-100 text-green-800' 
                        : member.performance >= 90
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {member.performance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link 
                      to={`/admin/salesteam/${member.id}`} 
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

export default SalesTeam;
