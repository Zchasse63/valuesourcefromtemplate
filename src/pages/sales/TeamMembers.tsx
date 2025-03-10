
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  TrendingUp 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { formatCurrency } from "@/utils/chartUtils";

// Mock team member data
interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  role: string;
  performance: number;
  customersCount: number;
  salesTotal: number;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Alex Johnson",
    avatar: "/images/avatars/avatar-1.jpg",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    role: "Sales Manager",
    performance: 112,
    customersCount: 28,
    salesTotal: 145800,
  },
  {
    id: "tm-2",
    name: "Sarah Williams",
    avatar: "/images/avatars/avatar-2.jpg",
    email: "sarah.williams@example.com",
    phone: "(555) 234-5678",
    role: "Senior Sales Rep",
    performance: 108,
    customersCount: 24,
    salesTotal: 128500,
  },
  {
    id: "tm-3",
    name: "Michael Brown",
    avatar: "/images/avatars/avatar-3.jpg",
    email: "michael.brown@example.com",
    phone: "(555) 345-6789",
    role: "Sales Rep",
    performance: 95,
    customersCount: 18,
    salesTotal: 98200,
  },
  {
    id: "tm-4",
    name: "Emily Davis",
    avatar: "/images/avatars/avatar-4.jpg",
    email: "emily.davis@example.com",
    phone: "(555) 456-7890",
    role: "Junior Sales Rep",
    performance: 87,
    customersCount: 12,
    salesTotal: 76500,
  },
  {
    id: "tm-5",
    name: "David Wilson",
    avatar: "/images/avatars/avatar-5.jpg",
    email: "david.wilson@example.com",
    phone: "(555) 567-8901",
    role: "Senior Sales Rep",
    performance: 104,
    customersCount: 22,
    salesTotal: 118300,
  },
];

const TeamMembers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter team members based on search term
  const filteredTeamMembers = mockTeamMembers.filter(member => 
    searchTerm === "" || 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContact = (member: TeamMember, method: 'email' | 'call' | 'message') => {
    const actions = {
      email: `Sending email to ${member.name}`,
      call: `Calling ${member.name} at ${member.phone}`,
      message: `Opening chat with ${member.name}`
    };
    
    toast({
      title: `Contact ${member.name}`,
      description: actions[method],
    });
  };

  return (
    <ErrorBoundary componentName="TeamMembers">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
              <Users className="h-8 w-8" />
              Sales Team
            </h1>
            <p className="text-secondary-foreground">Connect with your sales team members</p>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Find Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTeamMembers.length === 0 ? (
            <Card className="glass-card col-span-full">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No team members found</p>
              </CardContent>
            </Card>
          ) : (
            filteredTeamMembers.map(member => (
              <Card key={member.id} className="glass-card overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 md:w-1/3 flex flex-col items-center justify-center bg-muted/20">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                    <p className="text-sm text-muted-foreground text-center">{member.role}</p>
                    
                    <div className="flex mt-4 space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleContact(member, 'email')}
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleContact(member, 'call')}
                        aria-label={`Call ${member.name}`}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleContact(member, 'message')}
                        aria-label={`Message ${member.name}`}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <h4 className="text-sm font-medium text-muted-foreground mb-4">Performance Metrics</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Performance</span>
                          <span className="text-sm font-medium flex items-center">
                            <TrendingUp className={`h-3 w-3 mr-1 ${member.performance >= 100 ? 'text-green-500' : 'text-amber-500'}`} />
                            {member.performance}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${member.performance >= 100 ? 'bg-green-500' : 'bg-amber-500'}`}
                            style={{ width: `${Math.min(member.performance, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/20 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">Customers</p>
                          <p className="text-2xl font-semibold">{member.customersCount}</p>
                        </div>
                        <div className="bg-muted/20 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">Sales Total</p>
                          <p className="text-2xl font-semibold">{formatCurrency(member.salesTotal)}</p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "View Details",
                            description: `Viewing detailed performance for ${member.name}`,
                          });
                        }}
                      >
                        View Full Performance
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default TeamMembers;
