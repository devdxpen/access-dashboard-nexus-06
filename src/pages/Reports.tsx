
import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, Calendar, Users, Briefcase, TrendingUp } from 'lucide-react';

const Reports = () => {
  const reports = [
    {
      title: "Job Completion Report",
      description: "Summary of completed jobs by date range",
      icon: Briefcase,
      action: "Generate"
    },
    {
      title: "Technician Performance",
      description: "Performance metrics and ratings by technician",
      icon: Users,
      action: "View"
    },
    {
      title: "Monthly Analytics",
      description: "Monthly business performance overview",
      icon: TrendingUp,
      action: "Download"
    },
    {
      title: "Custom Date Range",
      description: "Generate reports for specific time periods",
      icon: Calendar,
      action: "Create"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Generate and download business reports</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Technicians</p>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Briefcase className="h-8 w-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <report.icon className="h-6 w-6 text-primary mr-3" />
                    {report.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{report.description}</p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    {report.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
