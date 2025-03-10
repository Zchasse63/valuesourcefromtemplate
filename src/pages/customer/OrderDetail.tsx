
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  Calendar, 
  CreditCard, 
  FileText,
  Download 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  // Mock order data
  const order = {
    id: orderId || "ORD-45678",
    date: "2023-06-15",
    status: "Shipped",
    total: 1250.00,
    subtotal: 1200.00,
    tax: 50.00,
    shipping: 0,
    paymentMethod: "Credit Card (ending in 4242)",
    billingAddress: {
      name: "John Smith",
      company: "Acme Corporation",
      street: "123 Business Ave",
      city: "Commerce",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    },
    shippingAddress: {
      name: "John Smith",
      company: "Acme Corporation",
      street: "123 Business Ave",
      city: "Commerce",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    },
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    estimatedDelivery: "Jun 18, 2023",
    items: [
      {
        id: "PROD-1234",
        name: "Industrial Pallet - Standard",
        sku: "PAL-STD-48x40",
        price: 350.00,
        quantity: 2,
        total: 700.00
      },
      {
        id: "PROD-2345",
        name: "Heavy Duty Pallet - Reinforced",
        sku: "PAL-HD-48x40",
        price: 500.00,
        quantity: 1,
        total: 500.00
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link to="/customer/orders" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-primary">Order Details</h1>
          <p className="text-secondary-foreground">Order ID: {order.id}</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Invoice
          </Button>
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Track Order
          </Button>
        </div>
      </div>
      
      <Card className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Date Placed</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium flex items-center gap-1">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {order.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium flex items-center gap-1">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  {order.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-medium">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Shipping Carrier</p>
                <p className="font-medium flex items-center gap-1">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  {order.carrier}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="font-medium">{order.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium">{order.estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
            <div className="border rounded-lg p-4">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.company}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-3">Billing Address</h2>
            <div className="border rounded-lg p-4">
              <p className="font-medium">{order.billingAddress.name}</p>
              <p>{order.billingAddress.company}</p>
              <p>{order.billingAddress.street}</p>
              <p>
                {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
              </p>
              <p>{order.billingAddress.country}</p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-end">
            <div className="w-full md:w-1/3 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetail;
