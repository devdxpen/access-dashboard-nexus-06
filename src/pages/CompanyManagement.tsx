
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, Edit, Eye, Power, Search, Filter, Users, Briefcase } from 'lucide-react';

const CompanyManagement = () => {
  const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false);
  const [isEditCompanyOpen, setIsEditCompanyOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for companies
  const companies = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      email: 'admin@techcorp.com',
      phone: '+1 234-567-8900',
      plan: 'Professional',
      status: 'active',
      technicians: 8,
      maxTechnicians: 10,
      jobsThisMonth: 45,
      joinDate: '2024-01-15',
      lastPayment: '2024-02-01',
      nextBilling: '2024-03-01'
    },
    {
      id: '2',
      name: 'ServicePro Ltd',
      email: 'contact@servicepro.com',
      phone: '+1 234-567-8901',
      plan: 'Enterprise',
      status: 'active',
      technicians: 22,
      maxTechnicians: 25,
      jobsThisMonth: 78,
      joinDate: '2023-11-20',
      lastPayment: '2024-02-01',
      nextBilling: '2024-03-01'
    },
    {
      id: '3',
      name: 'FixIt Now',
      email: 'info@fixitnow.com',
      phone: '+1 234-567-8902',
      plan: 'Basic',
      status: 'expired',
      technicians: 3,
      maxTechnicians: 5,
      jobsThisMonth: 12,
      joinDate: '2023-08-10',
      lastPayment: '2024-01-01',
      nextBilling: '2024-02-01'
    },
    {
      id: '4',
      name: 'QuickFix Services',
      email: 'admin@quickfix.com',
      phone: '+1 234-567-8903',
      plan: 'Professional',
      status: 'active',
      technicians: 6,
      maxTechnicians: 10,
      jobsThisMonth: 32,
      joinDate: '2024-01-20',
      lastPayment: '2024-02-01',
      nextBilling: '2024-03-01'
    }
  ];

  const subscriptionPlans = [
    { name: 'Basic', maxTechnicians: 5, price: '$29' },
    { name: 'Professional', maxTechnicians: 10, price: '$59' },
    { name: 'Enterprise', maxTechnicians: 25, price: '$99' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { label: 'Active', className: 'bg-green-100 text-green-800' },
      'expired': { label: 'Expired', className: 'bg-red-100 text-red-800' },
      'suspended': { label: 'Suspended', className: 'bg-yellow-100 text-yellow-800' }
    };
    const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Management</h1>
        <p className="text-gray-600">Manage registered companies and their subscriptions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Companies</p>
                <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Companies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {companies.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Technicians</p>
                <p className="text-2xl font-bold text-gray-900">
                  {companies.reduce((sum, c) => sum + c.technicians, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Jobs This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {companies.reduce((sum, c) => sum + c.jobsThisMonth, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Companies</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button onClick={() => setIsCreateCompanyOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Technicians</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-sm text-gray-500">ID: {company.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{company.email}</p>
                      <p className="text-sm text-gray-500">{company.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{company.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{company.technicians}</span>
                      <span className="text-gray-500">/ {company.maxTechnicians}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(company.technicians / company.maxTechnicians) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{company.jobsThisMonth}</TableCell>
                  <TableCell>{getStatusBadge(company.status)}</TableCell>
                  <TableCell>{company.nextBilling}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedCompany(company);
                          setIsEditCompanyOpen(true);
                        }}
                      >
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

      {/* Create Company Modal */}
      <Dialog open={isCreateCompanyOpen} onOpenChange={setIsCreateCompanyOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="Enter company name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" placeholder="admin@company.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 234-567-8900" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan">Subscription Plan</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptionPlans.map((plan) => (
                      <SelectItem key={plan.name} value={plan.name}>
                        {plan.name} - {plan.price}/month ({plan.maxTechnicians} techs)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Company Address</Label>
              <Input id="address" placeholder="Enter company address" />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateCompanyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateCompanyOpen(false)}>
              Create Company
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Company Modal */}
      <Dialog open={isEditCompanyOpen} onOpenChange={setIsEditCompanyOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Company - {selectedCompany?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editCompanyName">Company Name</Label>
                <Input id="editCompanyName" defaultValue={selectedCompany?.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editContactEmail">Contact Email</Label>
                <Input id="editContactEmail" type="email" defaultValue={selectedCompany?.email} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editPhone">Phone Number</Label>
                <Input id="editPhone" defaultValue={selectedCompany?.phone} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editPlan">Subscription Plan</Label>
                <Select defaultValue={selectedCompany?.plan}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptionPlans.map((plan) => (
                      <SelectItem key={plan.name} value={plan.name}>
                        {plan.name} - {plan.price}/month ({plan.maxTechnicians} techs)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select defaultValue={selectedCompany?.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editMaxTechs">Max Technicians</Label>
                <Input id="editMaxTechs" type="number" defaultValue={selectedCompany?.maxTechnicians} />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditCompanyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditCompanyOpen(false)}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyManagement;
