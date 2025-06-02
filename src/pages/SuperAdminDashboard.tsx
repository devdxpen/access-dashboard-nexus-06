
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Users, Building2, CreditCard, Settings, Plus, Edit, Eye, Power } from 'lucide-react';

const SuperAdminDashboard = () => {
  const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);

  // Mock data for admins
  const admins = [
    {
      id: '1',
      companyName: 'TechCorp Solutions',
      adminName: 'John Smith',
      email: 'john@techcorp.com',
      plan: 'Professional',
      technicians: '5/10',
      status: 'active',
      lastLogin: '2024-01-15'
    },
    {
      id: '2',
      companyName: 'ServicePro Ltd',
      adminName: 'Sarah Johnson',
      email: 'sarah@servicepro.com',
      plan: 'Enterprise',
      technicians: '15/25',
      status: 'active',
      lastLogin: '2024-01-14'
    },
    {
      id: '3',
      companyName: 'FixIt Now',
      adminName: 'Mike Wilson',
      email: 'mike@fixitnow.com',
      plan: 'Basic',
      technicians: '2/5',
      status: 'inactive',
      lastLogin: '2024-01-10'
    }
  ];

  // Mock data for subscription plans
  const subscriptionPlans = [
    {
      id: '1',
      name: 'Basic',
      maxTechnicians: 5,
      features: ['Job Management', 'Basic Reporting'],
      price: '$29/month',
      status: 'active'
    },
    {
      id: '2',
      name: 'Professional',
      maxTechnicians: 10,
      features: ['Job Management', 'Advanced Reporting', 'GPS Tracking'],
      price: '$59/month',
      status: 'active'
    },
    {
      id: '3',
      name: 'Enterprise',
      maxTechnicians: 25,
      features: ['All Features', 'API Access', 'Priority Support'],
      price: '$99/month',
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'active' ? 
      <Badge className="bg-green-100 text-green-800">Active</Badge> : 
      <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
        <p className="text-gray-600">Manage admin accounts and subscription plans</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Admins</p>
                <p className="text-2xl font-bold text-gray-900">{admins.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {admins.filter(a => a.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Subscription Plans</p>
                <p className="text-2xl font-bold text-gray-900">{subscriptionPlans.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$2,340</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Management */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Admin Accounts</CardTitle>
            <Button onClick={() => setIsCreateAdminOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Admin
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Admin Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Technicians</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.companyName}</TableCell>
                  <TableCell>{admin.adminName}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.plan}</TableCell>
                  <TableCell>{admin.technicians}</TableCell>
                  <TableCell>{getStatusBadge(admin.status)}</TableCell>
                  <TableCell>{admin.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Power className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Subscription Plans</CardTitle>
            <Button onClick={() => setIsCreatePlanOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className="border-2">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {plan.name}
                    {getStatusBadge(plan.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">{plan.price}</p>
                      <p className="text-sm text-gray-600">Max {plan.maxTechnicians} technicians</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Features:</p>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Power className="h-4 w-4 mr-1" />
                        Toggle
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Admin Modal */}
      <Dialog open={isCreateAdminOpen} onOpenChange={setIsCreateAdminOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Admin Account</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Enter company name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adminName">Admin Name</Label>
              <Input id="adminName" placeholder="Enter admin name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plan">Subscription Plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  {subscriptionPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.name}>{plan.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="active" defaultChecked />
              <Label htmlFor="active">Active Account</Label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateAdminOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateAdminOpen(false)}>
              Create Admin
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Plan Modal */}
      <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Subscription Plan</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="planName">Plan Name</Label>
              <Input id="planName" placeholder="Enter plan name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Monthly Price</Label>
              <Input id="price" placeholder="$29" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxTech">Max Technicians</Label>
              <Input id="maxTech" type="number" placeholder="5" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="features">Features (comma separated)</Label>
              <Input id="features" placeholder="Job Management, Reporting" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="planActive" defaultChecked />
              <Label htmlFor="planActive">Active Plan</Label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreatePlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreatePlanOpen(false)}>
              Create Plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminDashboard;
