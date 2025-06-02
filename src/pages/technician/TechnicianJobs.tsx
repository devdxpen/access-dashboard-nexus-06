
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  MapPin, 
  User, 
  Calendar,
  RefreshCw,
  WifiOff,
  Settings
} from 'lucide-react';

interface Job {
  id: string;
  clientName: string;
  property: string;
  serviceType: string;
  scheduledTime: string;
  scheduledDate: string;
  status: 'assigned' | 'in-progress' | 'completed';
  location: string;
  priority: 'high' | 'medium' | 'low';
}

const TechnicianJobs = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOffline] = useState(false);

  const jobs: Job[] = [
    {
      id: 'JOB-001',
      clientName: 'Acme Corp',
      property: 'Main Office Building',
      serviceType: 'HVAC Installation',
      scheduledTime: '09:00',
      scheduledDate: '2024-01-15',
      status: 'assigned',
      location: '123 Business St, City',
      priority: 'high'
    },
    {
      id: 'JOB-002',
      clientName: 'Tech Solutions',
      property: 'Data Center',
      serviceType: 'Network Maintenance',
      scheduledTime: '14:00',
      scheduledDate: '2024-01-15',
      status: 'in-progress',
      location: '456 Tech Ave, City',
      priority: 'medium'
    },
    {
      id: 'JOB-003',
      clientName: 'Global Industries',
      property: 'Warehouse A',
      serviceType: 'Electrical Repair',
      scheduledTime: '11:30',
      scheduledDate: '2024-01-14',
      status: 'completed',
      location: '789 Industrial Blvd, City',
      priority: 'high'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      assigned: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'border-l-red-500',
      medium: 'border-l-orange-500',
      low: 'border-l-gray-500'
    };
    return colors[priority as keyof typeof colors];
  };

  const filterJobsByTab = (tab: string) => {
    const today = '2024-01-15';
    
    switch (tab) {
      case 'today':
        return jobs.filter(job => job.scheduledDate === today && job.status !== 'completed');
      case 'upcoming':
        return jobs.filter(job => new Date(job.scheduledDate) > new Date(today));
      case 'completed':
        return jobs.filter(job => job.status === 'completed');
      default:
        return jobs;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleJobClick = (jobId: string) => {
    navigate(`/technician/job/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-semibold text-gray-900">Today's Jobs</h1>
            {isOffline && (
              <div className="flex items-center space-x-1 text-red-600">
                <WifiOff className="h-4 w-4" />
                <span className="text-xs">Offline</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/technician/profile')}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          {['today', 'upcoming', 'completed'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <div className="space-y-3">
                {filterJobsByTab(tab).map((job) => (
                  <Card 
                    key={job.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(job.priority)}`}
                    onClick={() => handleJobClick(job.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">{job.id}</span>
                            {getStatusBadge(job.status)}
                          </div>
                          <h3 className="font-semibold text-lg text-gray-900">{job.serviceType}</h3>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{job.scheduledTime}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{job.clientName} - {job.property}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{job.scheduledDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filterJobsByTab(tab).length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500">No jobs found for {tab}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default TechnicianJobs;
