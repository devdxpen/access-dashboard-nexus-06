import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus,
  TrendingUp,
  LogOut,
  Calendar,
  Filter,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Bell,
  X
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate('/');
  };

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'job_created',
      title: 'New Job Created',
      message: 'Technician John Smith created a new HVAC Installation job for Acme Corp',
      time: '2 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 2,
      type: 'job_completed',
      title: 'Job Completed',
      message: 'Sarah Johnson completed Plumbing Services at Tech Solutions and submitted for approval',
      time: '15 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'task_moved',
      title: 'Task Status Updated',
      message: 'Electrical Repair job moved to "In Progress" by Mike Wilson',
      time: '1 hour ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'approval_needed',
      title: 'Approval Required',
      message: 'Network Setup job at Startup Inc requires your approval with uploaded completion photos',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 5,
      type: 'technician_assigned',
      title: 'Technician Assigned',
      message: 'Alex Brown has been assigned to Security System installation at Metro Bank',
      time: '3 hours ago',
      read: true,
      priority: 'medium'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job_created':
        return <Plus className="h-4 w-4 text-blue-500" />;
      case 'job_completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'task_moved':
        return <Activity className="h-4 w-4 text-purple-500" />;
      case 'approval_needed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'technician_assigned':
        return <Users className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'high': { className: 'bg-red-100 text-red-800 border-red-200' },
      'medium': { className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      'low': { className: 'bg-green-100 text-green-800 border-green-200' }
    };
    
    const config = priorityConfig[priority] || { className: 'bg-gray-100 text-gray-800 border-gray-200' };
    return <Badge variant="outline" className={config.className}>{priority}</Badge>;
  };

  const overviewData = [
    {
      title: "Total Jobs",
      value: "7,265",
      change: "+11.01%",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "up",
      subtitle: "This month"
    },
    {
      title: "Active Jobs",
      value: "3,671", 
      change: "-0.03%",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "down",
      subtitle: "In progress"
    },
    {
      title: "New Clients",
      value: "156",
      change: "+15.03%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "up",
      subtitle: "This week"
    },
    {
      title: "Completion Rate",
      value: "93.8%",
      change: "+6.08%",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "up",
      subtitle: "Overall"
    }
  ];

  const recentJobs = [
    {
      id: "JOB-001",
      title: "HVAC Installation",
      client: "Acme Corp",
      technician: "John Smith",
      status: "in_progress",
      timeSpent: "3hr 20min",
      priority: "high"
    },
    {
      id: "JOB-002", 
      title: "Electrical Repair",
      client: "Tech Solutions",
      technician: "Sarah Johnson",
      status: "complete",
      timeSpent: "12hr 21min",
      priority: "medium"
    },
    {
      id: "JOB-003",
      title: "Plumbing Service",
      client: "Global Industries", 
      technician: "Mike Wilson",
      status: "pending",
      timeSpent: "78hr 5min",
      priority: "low"
    },
    {
      id: "JOB-004",
      title: "Network Setup",
      client: "Startup Inc",
      technician: "Emily Davis",
      status: "approved",
      timeSpent: "26hr 58min",
      priority: "high"
    },
    {
      id: "JOB-005",
      title: "Security System",
      client: "Metro Bank",
      technician: "Alex Brown",
      status: "rejected",
      timeSpent: "17hr 22min",
      priority: "medium"
    }
  ];

  const topTechnicians = [
    { name: "John Smith", completedJobs: 45, avatar: "/placeholder.svg", efficiency: "98%" },
    { name: "Sarah Johnson", completedJobs: 38, avatar: "/placeholder.svg", efficiency: "95%" },
    { name: "Mike Wilson", completedJobs: 32, avatar: "/placeholder.svg", efficiency: "92%" }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'complete': { label: 'Complete', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      'in_progress': { label: 'In Progress', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      'pending': { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      'approved': { label: 'Approved', className: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' },
      'rejected': { label: 'Rejected', className: 'bg-red-100 text-red-800 hover:bg-red-100' }
    };
    
    const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">FlashBiz Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, Admin</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              
              {/* Notification Button */}
              <Button 
                variant="outline" 
                size="sm"
                className="relative"
                onClick={() => setIsNotificationOpen(true)}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
              
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
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Notification Off-canvas */}
        {isNotificationOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsNotificationOpen(false)}
            />
            
            {/* Off-canvas panel */}
            <div className="ml-auto relative flex w-full max-w-md flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotificationOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            {getPriorityBadge(notification.priority)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t p-4">
                <Button className="w-full" variant="outline">
                  View All Notifications
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="p-6">
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewData.map((item, index) => (
                <Card key={index} className="card-hover animate-fade-in border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{item.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{item.value}</p>
                        <div className="flex items-center space-x-2">
                          <div className={`flex items-center ${item.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                            {item.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                            <span className="text-xs font-medium">{item.change}</span>
                          </div>
                          <span className="text-xs text-gray-500">{item.subtitle}</span>
                        </div>
                      </div>
                      <div className={`${item.bgColor} p-3 rounded-2xl`}>
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Jobs */}
              <Card className="lg:col-span-2 border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-lg font-semibold">Recent Jobs</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Latest job activities and status</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentJobs.map((job, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-8 bg-primary rounded-full"></div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="font-medium text-gray-900">{job.title}</p>
                              {getPriorityBadge(job.priority)}
                            </div>
                            <p className="text-sm text-gray-600">{job.client} • {job.technician}</p>
                            <p className="text-xs text-gray-500">Time: {job.timeSpent}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(job.status)}
                          <p className="text-xs text-gray-500 mt-1">{job.id}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Technicians */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Top Performers
                  </CardTitle>
                  <p className="text-sm text-gray-500">Best technicians this month</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topTechnicians.map((tech, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-full text-white font-bold text-sm">
                            #{index + 1}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={tech.avatar} />
                            <AvatarFallback>{tech.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                            <p className="text-xs text-gray-500">{tech.completedJobs} jobs • {tech.efficiency} efficiency</p>
                          </div>
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full" 
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
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                <p className="text-sm text-gray-500">Common tasks and shortcuts</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="flex flex-col items-center space-y-2 h-20 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                    <Plus className="h-5 w-5" />
                    <span>Create New Job</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center space-y-2 h-20 border-2 hover:bg-gray-50">
                    <Users className="h-5 w-5" />
                    <span>Add Technician</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center space-y-2 h-20 border-2 hover:bg-gray-50">
                    <Building2 className="h-5 w-5" />
                    <span>Add Client</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center space-y-2 h-20 border-2 hover:bg-gray-50">
                    <TrendingUp className="h-5 w-5" />
                    <span>View Reports</span>
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
