
import { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  UserPlus, 
  Filter, 
  Search, 
  Mail, 
  Shield, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { User } from "@/types/auth";

// Mock user data
const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "admin" : i % 3 === 1 ? "salesperson" : "customer",
  avatar: `/images/avatars/avatar-${(i % 8) + 1}.jpg`,
  isActive: Math.random() > 0.2,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
}));

const UsersManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(false);

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === null || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = () => {
    toast({
      title: "Create User",
      description: "User creation form would open here",
    });
  };

  const handleEditUser = (user: User) => {
    toast({
      title: "Edit User",
      description: `Editing user: ${user.name}`,
    });
  };

  const handleDeleteUser = (user: User) => {
    toast.warning({
      title: "Delete User",
      description: `Are you sure you want to delete ${user.name}?`,
    });
  };

  const handleToggleStatus = (user: User) => {
    if (typeof user.isActive !== 'boolean') return;
    
    const newUsers = users.map(u => 
      u.id === user.id ? { ...u, isActive: !u.isActive } : u
    );
    setUsers(newUsers);
    
    toast.success({
      title: `User ${user.isActive ? "Deactivated" : "Activated"}`,
      description: `${user.name} has been ${user.isActive ? "deactivated" : "activated"}`,
    });
  };

  const columns = [
    {
      key: "name",
      title: "Name",
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <Users className="w-full h-full p-2 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "role",
      title: "Role",
      render: (user: User) => {
        const roleStyles = {
          admin: "bg-purple-100 text-purple-800",
          salesperson: "bg-blue-100 text-blue-800",
          customer: "bg-green-100 text-green-800",
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleStyles[user.role]}`}>
            {user.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
            {user.role === "salesperson" && <Users className="w-3 h-3 mr-1" />}
            {user.role === "customer" && <Mail className="w-3 h-3 mr-1" />}
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: "status",
      title: "Status",
      render: (user: User) => {
        const isActive = user.isActive ?? false;
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {isActive ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 mr-1" />
                Inactive
              </>
            )}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: "createdAt",
      title: "Created",
      render: (user: User) => {
        const date = new Date(user.createdAt);
        return new Intl.DateTimeFormat('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }).format(date);
      },
      sortable: true,
    },
    {
      key: "actions",
      title: "Actions",
      render: (user: User) => {
        const isActive = user.isActive ?? false;
        return (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleEditUser(user)}
              aria-label="Edit user"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleToggleStatus(user)}
              aria-label={isActive ? "Deactivate user" : "Activate user"}
            >
              {isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => handleDeleteUser(user)}
              aria-label="Delete user"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <ErrorBoundary componentName="UsersManagement">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
              <Users className="h-8 w-8" />
              Users Management
            </h1>
            <p className="text-secondary-foreground">Manage system users and permissions</p>
          </div>
          <Button 
            className="flex items-center gap-2" 
            onClick={handleCreateUser}
          >
            <UserPlus className="h-4 w-4" />
            Create User
          </Button>
        </div>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">User Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="h-4 w-4" />
                    {roleFilter ? `Role: ${roleFilter}` : "Filter by Role"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setRoleFilter(null)}>
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("admin")}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("salesperson")}>
                    Salesperson
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("customer")}>
                    Customer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        <DataTable
          title="System Users"
          columns={columns}
          data={filteredUsers}
          isLoading={isLoading}
          keyExtractor={(item) => item.id}
          searchable={false} // We're handling search ourselves
          pagination={true}
          initialItemsPerPage={10}
          onRowClick={(user) => handleEditUser(user)}
        />
      </div>
    </ErrorBoundary>
  );
};

export default UsersManagement;
