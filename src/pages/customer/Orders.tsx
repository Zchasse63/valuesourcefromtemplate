
import { Card } from "@/components/ui/card";
import { Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerOrders = () => {
  // Mock orders data
  const orders = [
    { 
      id: "ORD-45678", 
      date: "2023-06-15", 
      status: "Shipped",
      total: 1250.00,
      items: 3,
      delivery: "Jun 18, 2023"
    },
    { 
      id: "ORD-45677", 
      date: "2023-05-28", 
      status: "Delivered",
      total: 950.50,
      items: 2,
      delivery: "Jun 02, 2023"
    },
    { 
      id: "ORD-45676", 
      date: "2023-05-10", 
      status: "Delivered",
      total: 2150.25,
      items: 5,
      delivery: "May 15, 2023"
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">My Orders</h1>
      <p className="text-secondary-foreground">View and track all your orders.</p>

      <div className="grid grid-cols-1 gap-6">
        {orders.map(order => (
          <Card key={order.id} className="glass-card p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{order.id}</h2>
                  <p className="text-sm text-gray-500">
                    Ordered on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-medium ${
                    order.status === "Delivered" ? "text-green-600" : "text-blue-600"
                  }`}>
                    {order.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-gray-500">Items</p>
                  <p className="font-medium">{order.items} items</p>
                </div>
              </div>
              
              <Link 
                to={`/customer/orders/${order.id}`} 
                className="flex items-center gap-1 text-primary hover:text-primary/90"
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

export default CustomerOrders;
