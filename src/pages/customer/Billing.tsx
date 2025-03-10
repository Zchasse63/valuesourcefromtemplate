
import { Card } from "@/components/ui/card";
import { CreditCard, Download, AlertCircle } from "lucide-react";

const CustomerBilling = () => {
  // Mock invoices data
  const invoices = [
    { 
      id: "INV-2023-045", 
      date: "2023-06-01", 
      dueDate: "2023-06-30",
      status: "Unpaid",
      amount: 350.00
    },
    { 
      id: "INV-2023-032", 
      date: "2023-05-01", 
      dueDate: "2023-05-31",
      status: "Paid",
      amount: 350.00,
      paidDate: "2023-05-28"
    },
    { 
      id: "INV-2023-019", 
      date: "2023-04-01", 
      dueDate: "2023-04-30",
      status: "Paid",
      amount: 350.00,
      paidDate: "2023-04-25"
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Billing & Invoices</h1>
      <p className="text-secondary-foreground">Manage your billing information and view invoices.</p>

      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="flex gap-4 items-center">
          <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center">
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">Visa ending in 4242</p>
            <p className="text-sm text-gray-500">Expires 04/2025</p>
          </div>
          <button className="ml-auto bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium">
            Update
          </button>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Invoices</h2>
        
        {invoices.map(invoice => (
          <Card key={invoice.id} className="glass-card p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-semibold">{invoice.id}</h3>
                <p className="text-sm text-gray-500">
                  Issued on {new Date(invoice.date).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  invoice.status === 'Paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {invoice.status}
                </span>
                <span className="font-semibold">${invoice.amount.toFixed(2)}</span>
              </div>
              
              <div>
                {invoice.status === 'Unpaid' ? (
                  <div className="flex items-center gap-1 text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Due {new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Paid on {new Date(invoice.paidDate!).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <button className="flex items-center gap-1 text-primary hover:text-primary/90">
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerBilling;
