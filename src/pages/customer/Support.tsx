
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  HelpCircle, 
  MessageSquare, 
  Search, 
  FileText, 
  Send,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CustomerSupport = () => {
  const { toast } = useToast();
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock FAQ data
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the 'My Orders' section and clicking on the specific order you want to track. There you'll find detailed tracking information."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, bank transfers, and purchase orders for approved business accounts."
    },
    {
      question: "How can I request a quote for bulk orders?",
      answer: "You can request a quote by contacting your assigned sales representative directly or by filling out the quote request form in the Orders section."
    },
    {
      question: "What is your return policy?",
      answer: "Our standard return policy allows returns within 30 days of delivery for unused items in original packaging. Custom orders may have different terms specified in your contract."
    }
  ];

  // Mock recent tickets
  const recentTickets = [
    { id: "TK-2023-0451", subject: "Shipping delay inquiry", status: "Open", lastUpdate: "2023-06-28" },
    { id: "TK-2023-0443", subject: "Invoice correction request", status: "Closed", lastUpdate: "2023-06-20" }
  ];

  const submitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDescription) {
      toast({
        title: "Missing information",
        description: "Please provide both a subject and description for your support ticket.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally submit the ticket to an API
    toast({
      title: "Support ticket submitted",
      description: "Your ticket has been received. We'll get back to you shortly.",
    });
    
    // Reset form
    setTicketSubject("");
    setTicketDescription("");
  };

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
        <HelpCircle className="h-8 w-8" />
        Customer Support
      </h1>
      <p className="text-secondary-foreground">
        Get help with your account, orders, or any other questions you might have.
      </p>

      <Tabs defaultValue="help" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="help">Help Center</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>
        
        <TabsContent value="help" className="space-y-6">
          <Card className="glass-card p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help topics..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
              
              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                      <p className="text-secondary-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-secondary-foreground">No results found for "{searchQuery}"</p>
                  <Button 
                    variant="link" 
                    onClick={() => setSearchQuery("")}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-3">Browse Help Topics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: FileText, title: "Product Documentation" },
                  { icon: MessageSquare, title: "Common Questions" },
                  { icon: Search, title: "Troubleshooting" }
                ].map((item, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    className="justify-start h-auto py-3"
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.title}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets" className="space-y-6">
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6">Open a New Support Ticket</h2>
            
            <form onSubmit={submitTicket} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input 
                  id="subject"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea 
                  id="description"
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder="Please provide as much detail as possible"
                  rows={5}
                />
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Ticket
                </Button>
              </div>
            </form>
            
            {recentTickets.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium mb-4">Your Recent Tickets</h3>
                <div className="space-y-3">
                  {recentTickets.map(ticket => (
                    <div 
                      key={ticket.id}
                      className="flex items-center justify-between border rounded-lg p-4"
                    >
                      <div>
                        <p className="font-medium">{ticket.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {ticket.id} • Last updated: {ticket.lastUpdate}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ticket.status === 'Open' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {ticket.status}
                        </span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-6">
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Chat Support</h3>
                    <p className="text-secondary-foreground text-sm">
                      Available Monday-Friday, 9AM-5PM EST
                    </p>
                    <Button variant="link" className="px-0 h-auto">
                      Start Chat
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-secondary-foreground text-sm">
                      Responses typically within 24 hours
                    </p>
                    <p className="text-primary">support@palletpro.com</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Your Account Manager</h3>
                    <p className="text-secondary-foreground text-sm">
                      Direct support for your business needs
                    </p>
                    <p className="text-primary">account-manager@palletpro.com</p>
                    <p className="text-secondary-foreground text-sm">
                      Phone: (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-secondary-foreground text-sm">
                      Monday-Friday: 9AM-5PM EST<br />
                      Saturday: 10AM-2PM EST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerSupport;
