
import React from 'react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import AdminSidebar from '@/components/AdminSidebar';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate('/');
  };

  const overviewData = [
    {
      title: "Total Jobs Today",
      value: "24",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12% from yesterday"
    },
    {
      title: "Pending Jobs",
      value: "8",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "3 urgent"
    },
    {
      title: "Ongoing Jobs",
      value: "12",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "2 near deadline"
    },
    {
      title: "Completed Jobs",
      value: "156",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8% this week"
    }
  ];

  const recentJobs = [
    {
      id: "JOB-001",
      client: "Acme Corp",
      technician: "John Smith",
      status: "ongoing",
      scheduledDate: "2024-01-15"
    },
    {
      id: "JOB-002",
      client: "Tech Solutions",
      technician: "Sarah Johnson",
      status: "pending",
      scheduledDate: "2024-01-16"
    },
    {
      id: "JOB-003",
      client: "Global Industries",
      technician: "Mike Wilson",
      status: "completed",
      scheduledDate: "2024-01-14"
    },
    {
      id: "JOB-004",
      client: "Startup Inc",
      technician: "Emily Davis",
      status: "ongoing",
      scheduledDate: "2024-01-15"
    }
  ];

  const topTechnicians = [
    { name: "John Smith", completedJobs: 45, avatar: "/placeholder.svg" },
    { name: "Sarah Johnson", completedJobs: 38, avatar: "/placeholder.svg" },
    { name: "Mike Wilson", completedJobs: 32, avatar: "/placeholder.svg" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'ongoing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Ongoing</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewData.map((item, index) => (
                <Card key={index} className="card-hover animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{item.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.change}</p>
                      </div>
                      <div className={`${item.bgColor} p-3 rounded-full`}>
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Jobs */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Recent Jobs</CardTitle>
                  <Button variant="outline" size="sm">
                    View All Jobs
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="pb-3 text-sm font-medium text-gray-600">Job ID</th>
                          <th className="pb-3 text-sm font-medium text-gray-600">Client</th>
                          <th className="pb-3 text-sm font-medium text-gray-600">Technician</th>
                          <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                          <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentJobs.map((job, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-3 text-sm font-medium text-gray-900">{job.id}</td>
                            <td className="py-3 text-sm text-gray-600">{job.client}</td>
                            <td className="py-3 text-sm text-gray-600">{job.technician}</td>
                            <td className="py-3">{getStatusBadge(job.status)}</td>
                            <td className="py-3 text-sm text-gray-600">{job.scheduledDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Technician Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Top Technicians
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topTechnicians.map((tech, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-semibold text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                            <p className="text-xs text-gray-500">{tech.completedJobs} jobs completed</p>
                          </div>
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(tech.completedJobs / 50) * 100}%` }}
                          ></div>
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
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <Button className="flex items-center space-x-2 h-12">
                    <Plus className="h-4 w-4" />
                    <span>Create New Job</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 h-12">
                    <Users className="h-4 w-4" />
                    <span>Add Technician</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 h-12">
                    <Building2 className="h-4 w-4" />
                    <span>Add Client</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
