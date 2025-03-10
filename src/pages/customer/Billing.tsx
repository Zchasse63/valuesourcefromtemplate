
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, AlertCircle, Plus, CreditCardIcon, Calendar, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const CustomerBilling = () => {
  const { toast } = useToast();
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  const [showUpdatePaymentDialog, setShowUpdatePaymentDialog] = useState(false);
  const [showInvoiceDetail, setShowInvoiceDetail] = useState<string | null>(null);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  
  // Mock payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    { 
      id: "pm_1", 
      type: "visa", 
      last4: "4242", 
      expMonth: 4, 
      expYear: 2025,
      isDefault: true
    }
  ]);

  // Mock invoices data
  const invoices = [
    { 
      id: "INV-2023-045", 
      date: "2023-06-01", 
      dueDate: "2023-06-30",
      status: "Unpaid",
      amount: 350.00,
      description: "Monthly Pallet Supply Subscription - June 2023",
      items: [
        { name: "Premium Pine Pallets Subscription", quantity: 50, unitPrice: 7.00 }
      ]
    },
    { 
      id: "INV-2023-032", 
      date: "2023-05-01", 
      dueDate: "2023-05-31",
      status: "Paid",
      amount: 350.00,
      paidDate: "2023-05-28",
      description: "Monthly Pallet Supply Subscription - May 2023",
      items: [
        { name: "Premium Pine Pallets Subscription", quantity: 50, unitPrice: 7.00 }
      ]
    },
    { 
      id: "INV-2023-019", 
      date: "2023-04-01", 
      dueDate: "2023-04-30",
      status: "Paid",
      amount: 350.00,
      paidDate: "2023-04-25",
      description: "Monthly Pallet Supply Subscription - April 2023",
      items: [
        { name: "Premium Pine Pallets Subscription", quantity: 50, unitPrice: 7.00 }
      ]
    }
  ];

  const [newCardInfo, setNewCardInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
    makeDefault: false
  });

  const handleAddPaymentMethod = () => {
    if (!newCardInfo.cardNumber || !newCardInfo.nameOnCard || !newCardInfo.expiryDate || !newCardInfo.cvv) {
      toast({
        title: "Missing information",
        description: "Please fill in all card details",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call a payment processing API
    const [expMonth, expYear] = newCardInfo.expiryDate.split('/');
    
    const newPaymentMethod = {
      id: `pm_${Date.now()}`,
      type: getCardType(newCardInfo.cardNumber),
      last4: newCardInfo.cardNumber.slice(-4),
      expMonth: parseInt(expMonth),
      expYear: parseInt(`20${expYear}`),
      isDefault: newCardInfo.makeDefault
    };
    
    // Update payment methods
    setPaymentMethods(prev => {
      let updated = [...prev];
      
      // If new card is default, update other cards
      if (newCardInfo.makeDefault) {
        updated = updated.map(pm => ({...pm, isDefault: false}));
      }
      
      return [...updated, newPaymentMethod];
    });
    
    setShowAddPaymentDialog(false);
    setNewCardInfo({
      cardNumber: "",
      nameOnCard: "",
      expiryDate: "",
      cvv: "",
      makeDefault: false
    });
    
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully",
      variant: "success"
    });
  };

  const handleUpdatePaymentMethod = () => {
    // In a real app, this would update the payment method
    setShowUpdatePaymentDialog(false);
    
    toast({
      title: "Payment method updated",
      description: "Your payment method has been updated successfully",
      variant: "success"
    });
  };

  const handleMakeDefault = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(pm => ({
        ...pm,
        isDefault: pm.id === id
      }))
    );
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been changed",
      variant: "success"
    });
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed",
      variant: "success"
    });
  };

  const handlePayInvoice = (invoiceId: string) => {
    setPaymentInProgress(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentInProgress(false);
      setShowInvoiceDetail(null);
      
      toast.success({
        title: "Payment successful",
        description: `Invoice ${invoiceId} has been paid`,
      });
    }, 2000);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real app, this would download the invoice
    toast({
      title: "Invoice downloaded",
      description: `Invoice ${invoiceId} has been downloaded`,
      variant: "success"
    });
  };

  // Helper function to determine card type based on number
  const getCardType = (cardNumber: string): string => {
    // Very basic card type detection - would be more sophisticated in a real app
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    if (firstDigit === '3') return 'amex';
    if (firstDigit === '6') return 'discover';
    return 'unknown';
  };

  // Get the selected invoice for the detail view
  const selectedInvoice = showInvoiceDetail 
    ? invoices.find(inv => inv.id === showInvoiceDetail) 
    : null;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Billing & Invoices</h1>
      <p className="text-secondary-foreground">Manage your billing information and view invoices.</p>

      {/* Payment Methods Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Payment Methods</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowAddPaymentDialog(true)}
          >
            <Plus className="h-4 w-4" />
            Add Payment Method
          </Button>
        </div>

        {paymentMethods.map(method => (
          <Card key={method.id} className="glass-card p-6">
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium capitalize">{method.type} ending in {method.last4}</p>
                  {method.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                </p>
              </div>
              <div className="flex gap-2">
                {!method.isDefault && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleMakeDefault(method.id)}
                  >
                    Make Default
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowUpdatePaymentDialog(true)}
                >
                  Update
                </Button>
                {paymentMethods.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRemovePaymentMethod(method.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Invoices Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Invoices</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(invoice => (
              <TableRow key={invoice.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setShowInvoiceDetail(invoice.id)}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    invoice.status === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {invoice.status === 'Unpaid' && (
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowInvoiceDetail(invoice.id);
                        }}
                      >
                        Pay Now
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadInvoice(invoice.id);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Payment Method Dialog */}
      <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  value={newCardInfo.cardNumber}
                  onChange={(e) => setNewCardInfo({...newCardInfo, cardNumber: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  placeholder="John Doe"
                  value={newCardInfo.nameOnCard}
                  onChange={(e) => setNewCardInfo({...newCardInfo, nameOnCard: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={newCardInfo.expiryDate}
                  onChange={(e) => setNewCardInfo({...newCardInfo, expiryDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={newCardInfo.cvv}
                  onChange={(e) => setNewCardInfo({...newCardInfo, cvv: e.target.value})}
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <Checkbox 
                  id="makeDefault" 
                  checked={newCardInfo.makeDefault}
                  onCheckedChange={(checked) => 
                    setNewCardInfo({...newCardInfo, makeDefault: checked === true})
                  }
                />
                <label
                  htmlFor="makeDefault"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Make this my default payment method
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod}>
              Add Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Payment Method Dialog */}
      <Dialog open={showUpdatePaymentDialog} onOpenChange={setShowUpdatePaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">New Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  defaultValue="04/25"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdatePaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePaymentMethod}>
              Update Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Detail Dialog */}
      <Dialog open={!!showInvoiceDetail} onOpenChange={(open) => !open && setShowInvoiceDetail(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Invoice Details - {selectedInvoice?.id}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p>{new Date(selectedInvoice.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedInvoice.status === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedInvoice.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p>{new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-semibold">${selectedInvoice.amount.toFixed(2)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p>{selectedInvoice.description}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Items</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="py-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${selectedInvoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${selectedInvoice.amount.toFixed(2)}</span>
                </div>
              </div>
              
              {selectedInvoice.status === 'Paid' ? (
                <div className="bg-green-50 p-3 rounded-md flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-green-700 font-medium">Paid</p>
                    <p className="text-green-600 text-sm">
                      Payment received on {new Date(selectedInvoice.paidDate!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <p className="font-medium">Payment Options</p>
                  
                  {paymentMethods.map(method => (
                    <div key={method.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <CreditCardIcon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="capitalize">{method.type} ending in {method.last4}</p>
                          <p className="text-sm text-gray-500">
                            Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      <Button 
                        disabled={paymentInProgress}
                        onClick={() => handlePayInvoice(selectedInvoice.id)}
                      >
                        {paymentInProgress ? 'Processing...' : 'Pay Now'}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvoiceDetail(null)}>
              Close
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleDownloadInvoice(selectedInvoice?.id || '')}
              className="gap-1"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerBilling;
