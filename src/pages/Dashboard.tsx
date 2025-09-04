import React from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Briefcase, 
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  PieChart,
  Target,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AdminSidebar from '@/components/AdminSidebar';

const Dashboard = () => {
  // Dashboard metrics data
  const dashboardStats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      description: "From last month"
    },
    {
      title: "Active Jobs",
      value: "2,350",
      change: "+180.1%",
      trend: "up", 
      icon: Briefcase,
      description: "Currently in progress"
    },
    {
      title: "Total Customers",
      value: "12,234",
      change: "+19%",
      trend: "up",
      icon: Users,
      description: "Active customers"
    },
    {
      title: "Completion Rate",
      value: "94.8%",
      change: "+4.3%",
      trend: "up",
      icon: Target,
      description: "This month"
    }
  ];

  const recentActivity = [
    {
      title: "New job created",
      description: "HVAC Installation at ABC Corp",
      time: "2 minutes ago",
      status: "new"
    },
    {
      title: "Job completed",
      description: "Electrical Repair by John Smith",
      time: "15 minutes ago", 
      status: "completed"
    },
    {
      title: "Payment received",
      description: "$2,400 from TechCorp Ltd",
      time: "1 hour ago",
      status: "payment"
    },
    {
      title: "New technician assigned",
      description: "Sarah Johnson to Plumbing Service",
      time: "2 hours ago",
      status: "assigned"
    }
  ];

  const topPerformers = [
    { name: "John Smith", jobs: 45, rating: 4.9, revenue: "$12,450" },
    { name: "Sarah Johnson", jobs: 38, rating: 4.8, revenue: "$9,200" },
    { name: "Mike Wilson", jobs: 32, rating: 4.7, revenue: "$8,100" },
    { name: "Emily Davis", jobs: 28, rating: 4.6, revenue: "$7,300" }
  ];

  const monthlyProgress = [
    { month: "Jan", jobs: 65, revenue: 8400 },
    { month: "Feb", jobs: 78, revenue: 9200 },
    { month: "Mar", jobs: 82, revenue: 10100 },
    { month: "Apr", jobs: 91, revenue: 11800 },
    { month: "May", jobs: 95, revenue: 12400 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <AdminSidebar />
      
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button>
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center text-sm ${
                          stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {stat.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="font-medium">{stat.change}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {stat.description}
                        </span>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                  <p className="text-sm text-muted-foreground">Latest updates and notifications</p>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      activity.status === 'new' ? 'bg-blue-500' :
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'payment' ? 'bg-yellow-500' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">Top Performers</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Best technicians this month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {performer.name}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{performer.jobs} jobs</span>
                          <span>•</span>
                          <span>★ {performer.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {performer.revenue}
                      </p>
                      <Progress 
                        value={(performer.jobs / 50) * 100} 
                        className="w-16 h-2 mt-1"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Monthly Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">Monthly Progress</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Jobs completed over time</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyProgress.map((month, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-muted-foreground w-8">
                          {month.month}
                        </span>
                        <div className="flex-1">
                          <Progress value={(month.jobs / 100) * 100} className="h-2" />
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium text-foreground">{month.jobs} jobs</p>
                        <p className="text-muted-foreground">${month.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Current status overview</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-emerald-600">89</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">Completed Today</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">24</p>
                    <p className="text-xs text-blue-700 dark:text-blue-400">In Progress</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">7</p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400">Urgent Tasks</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                    <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">156</p>
                    <p className="text-xs text-purple-700 dark:text-purple-400">Locations</p>
                  </div>
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