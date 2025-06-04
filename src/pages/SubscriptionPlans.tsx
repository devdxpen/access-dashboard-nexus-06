import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Edit, Users, CheckCircle, X, DollarSign, Calendar } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SuperAdminSidebar } from '@/components/SuperAdminSidebar';

const SubscriptionPlans = () => {
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Mock data for subscription plans
  const subscriptionPlans = [
    {
      id: '1',
      name: 'Basic',
      price: 29,
      maxTechnicians: 5,
      maxJobs: 100,
      features: [
        'Job Management',
        'Basic Reporting',
        'Mobile App Access',
        'Email Support'
      ],
      restrictions: [
        'No GPS Tracking',
        'No API Access',
        'Limited Integrations'
      ],
      status: 'active',
      subscribers: 15,
      monthlyRevenue: 435,
      popular: false
    },
    {
      id: '2',
      name: 'Professional',
      price: 59,
      maxTechnicians: 10,
      maxJobs: 500,
      features: [
        'All Basic Features',
        'GPS Tracking',
        'Advanced Reporting',
        'Custom Fields',
        'Priority Support',
        'Team Collaboration'
      ],
      restrictions: [
        'No API Access',
        'Limited White Labeling'
      ],
      status: 'active',
      subscribers: 18,
      monthlyRevenue: 1062,
      popular: true
    },
    {
      id: '3',
      name: 'Enterprise',
      price: 99,
      maxTechnicians: 25,
      maxJobs: -1, // Unlimited
      features: [
        'All Professional Features',
        'API Access',
        'White Labeling',
        'Custom Integrations',
        'Dedicated Support',
        'Advanced Analytics',
        'Multi-location Support'
      ],
      restrictions: [],
      status: 'active',
      subscribers: 8,
      monthlyRevenue: 792,
      popular: false
    },
    {
      id: '4',
      name: 'Starter',
      price: 15,
      maxTechnicians: 2,
      maxJobs: 50,
      features: [
        'Basic Job Management',
        'Email Support'
      ],
      restrictions: [
        'No Mobile App',
        'No Reporting',
        'No GPS Tracking'
      ],
      status: 'inactive',
      subscribers: 0,
      monthlyRevenue: 0,
      popular: false
    }
  ];

  const getStatusBadge = (status) => {
    return status === 'active' ? 
      <Badge className="bg-green-100 text-green-800">Active</Badge> : 
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  const totalRevenue = subscriptionPlans.reduce((sum, plan) => sum + plan.monthlyRevenue, 0);
  const totalSubscribers = subscriptionPlans.reduce((sum, plan) => sum + plan.subscribers, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SuperAdminSidebar />
        <SidebarInset>
          <div className="flex h-16 shrink-0 items-center gap-2 px-6 border-b">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto">
              <h1 className="text-xl font-semibold">Subscription Plans</h1>
            </div>
          </div>

          <div className="flex-1 p-6 bg-gray-50">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Plans</h1>
              <p className="text-gray-600">Create and manage subscription plans for companies</p>
            </div>

            {/* Revenue Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                      <p className="text-2xl font-bold text-gray-900">{totalSubscribers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-purple-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Plans</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {subscriptionPlans.filter(p => p.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-orange-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Revenue per User</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${totalSubscribers > 0 ? Math.round(totalRevenue / totalSubscribers) : 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plans Grid */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Available Plans</h2>
              <Button onClick={() => setIsCreatePlanOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Plan
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        {getStatusBadge(plan.status)}
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-blue-600">${plan.price}</p>
                        <p className="text-sm text-gray-500">per month</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Plan Limits */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2">Plan Limits:</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Technicians:</span>
                            <span className="font-medium">{plan.maxTechnicians}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Monthly Jobs:</span>
                            <span className="font-medium">
                              {plan.maxJobs === -1 ? 'Unlimited' : plan.maxJobs}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Restrictions */}
                      {plan.restrictions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Restrictions:</p>
                          <ul className="space-y-1">
                            {plan.restrictions.map((restriction, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-500">
                                <X className="h-3 w-3 text-red-500 mr-2 flex-shrink-0" />
                                {restriction}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Subscribers & Revenue */}
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-600">Subscribers</p>
                            <p className="text-lg font-bold text-blue-600">{plan.subscribers}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Monthly Revenue</p>
                            <p className="text-lg font-bold text-blue-600">${plan.monthlyRevenue}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedPlan(plan);
                            setIsEditPlanOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={plan.status === 'active' ? 'text-red-600' : 'text-green-600'}
                        >
                          {plan.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Create Plan Modal */}
            <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Subscription Plan</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="planName">Plan Name</Label>
                      <Input id="planName" placeholder="e.g., Professional" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Monthly Price ($)</Label>
                      <Input id="price" type="number" placeholder="59" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="maxTechs">Max Technicians</Label>
                      <Input id="maxTechs" type="number" placeholder="10" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="maxJobs">Max Monthly Jobs</Label>
                      <Input id="maxJobs" type="number" placeholder="500 (or -1 for unlimited)" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="features">Features (one per line)</Label>
                    <textarea 
                      id="features" 
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Job Management&#10;GPS Tracking&#10;Advanced Reporting"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="restrictions">Restrictions (one per line)</Label>
                    <textarea 
                      id="restrictions" 
                      className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="No API Access&#10;Limited Integrations"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="active" defaultChecked />
                    <Label htmlFor="active">Active Plan</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="popular" />
                    <Label htmlFor="popular">Mark as Popular</Label>
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

            {/* Edit Plan Modal */}
            <Dialog open={isEditPlanOpen} onOpenChange={setIsEditPlanOpen}>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Plan - {selectedPlan?.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="editPlanName">Plan Name</Label>
                      <Input id="editPlanName" defaultValue={selectedPlan?.name} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="editPrice">Monthly Price ($)</Label>
                      <Input id="editPrice" type="number" defaultValue={selectedPlan?.price} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="editMaxTechs">Max Technicians</Label>
                      <Input id="editMaxTechs" type="number" defaultValue={selectedPlan?.maxTechnicians} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="editMaxJobs">Max Monthly Jobs</Label>
                      <Input id="editMaxJobs" type="number" defaultValue={selectedPlan?.maxJobs === -1 ? -1 : selectedPlan?.maxJobs} />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="editFeatures">Features (one per line)</Label>
                    <textarea 
                      id="editFeatures" 
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue={selectedPlan?.features.join('\n')}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="editRestrictions">Restrictions (one per line)</Label>
                    <textarea 
                      id="editRestrictions" 
                      className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue={selectedPlan?.restrictions.join('\n')}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="editActive" defaultChecked={selectedPlan?.status === 'active'} />
                    <Label htmlFor="editActive">Active Plan</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="editPopular" defaultChecked={selectedPlan?.popular} />
                    <Label htmlFor="editPopular">Mark as Popular</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditPlanOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsEditPlanOpen(false)}>
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SubscriptionPlans;
