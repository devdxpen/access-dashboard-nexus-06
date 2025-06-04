
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, CreditCard, TrendingUp, Activity, Target, DollarSign, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data for overview
  const overviewStats = [
    {
      title: "Total Companies",
      value: "47",
      change: "+12%",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Active registered companies"
    },
    {
      title: "Active Subscriptions",
      value: "41",
      change: "+8%", 
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Currently paying subscriptions"
    },
    {
      title: "Total Technicians",
      value: "312",
      change: "+15%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Across all companies"
    },
    {
      title: "Monthly Revenue",
      value: "$24,890",
      change: "+23%",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Recurring monthly revenue"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'company_registered',
      message: 'New company "ServiceTech Pro" registered with Professional plan',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'subscription_upgraded',
      message: 'TechCorp Solutions upgraded from Basic to Enterprise plan',
      time: '5 hours ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'payment_received',
      message: 'Payment received from ServicePro Ltd - $99.00',
      time: '1 day ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'subscription_expired',
      message: 'Subscription expired for FixIt Now - requires renewal',
      time: '2 days ago',
      status: 'warning'
    }
  ];

  const planDistribution = [
    { name: 'Basic', count: 15, percentage: 32, color: 'bg-blue-500' },
    { name: 'Professional', count: 18, percentage: 39, color: 'bg-green-500' },
    { name: 'Enterprise', count: 8, percentage: 17, color: 'bg-purple-500' },
    { name: 'Expired/Inactive', count: 6, percentage: 12, color: 'bg-gray-400' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
        <p className="text-gray-600">Overview of companies, subscriptions, and system performance</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    <span className="text-xs text-gray-500">{stat.description}</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-2xl`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Plan Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Plan Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planDistribution.map((plan, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${plan.color}`}></div>
                    <span className="text-sm font-medium">{plan.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">{plan.count}</span>
                    <span className="text-xs text-gray-500 ml-1">({plan.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' : 
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="flex flex-col items-center space-y-2 h-20"
              onClick={() => navigate('/super-admin/companies')}
            >
              <Building2 className="h-6 w-6" />
              <span>Manage Companies</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-2 h-20"
              onClick={() => navigate('/super-admin/subscriptions')}
            >
              <CreditCard className="h-6 w-6" />
              <span>Subscription Plans</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center space-y-2 h-20"
            >
              <TrendingUp className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
