
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon,
  Clock, 
  MapPin, 
  User, 
  CheckCircle2,
  Filter,
  Download,
  Search,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isWithinInterval, parseISO } from 'date-fns';

interface JobHistory {
  id: string;
  clientName: string;
  property: string;
  serviceType: string;
  completedDate: string;
  completedTime: string;
  location: string;
  duration: string;
  status: 'completed' | 'approved';
  notes?: string;
  images?: string[];
  rating?: number;
}

const TechnicianHistory = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for job history
  const jobHistory: JobHistory[] = [
    {
      id: 'JOB-001',
      clientName: 'Acme Corp',
      property: 'Main Office Building',
      serviceType: 'HVAC Installation',
      completedDate: '2024-01-15',
      completedTime: '14:30',
      location: '123 Business St, City',
      duration: '4 hours',
      status: 'approved',
      notes: 'Installation completed successfully. All systems tested.',
      rating: 5
    },
    {
      id: 'JOB-002',
      clientName: 'Tech Solutions',
      property: 'Data Center',
      serviceType: 'Network Maintenance',
      completedDate: '2024-01-14',
      completedTime: '11:15',
      location: '456 Tech Ave, City',
      duration: '2.5 hours',
      status: 'completed',
      notes: 'Routine maintenance completed. No issues found.'
    },
    {
      id: 'JOB-003',
      clientName: 'Global Industries',
      property: 'Warehouse A',
      serviceType: 'Electrical Repair',
      completedDate: '2024-01-12',
      completedTime: '09:45',
      location: '789 Industrial Blvd, City',
      duration: '3 hours',
      status: 'approved',
      notes: 'Replaced faulty wiring. Power restored.',
      rating: 4
    },
    {
      id: 'JOB-004',
      clientName: 'Startup Inc',
      property: 'Office Floor 3',
      serviceType: 'Security Installation',
      completedDate: '2024-01-10',
      completedTime: '16:20',
      location: '321 Innovation St, City',
      duration: '5 hours',
      status: 'completed',
      notes: 'Security cameras installed and configured.'
    },
    {
      id: 'JOB-005',
      clientName: 'Medical Center',
      property: 'Emergency Wing',
      serviceType: 'Equipment Repair',
      completedDate: '2024-01-08',
      completedTime: '13:00',
      location: '555 Health Ave, City',
      duration: '1.5 hours',
      status: 'approved',
      rating: 5
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      completed: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>;
  };

  const getRatingStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const filterJobsByDate = (jobs: JobHistory[]) => {
    if (!selectedDate) return jobs;
    return jobs.filter(job => job.completedDate === format(selectedDate, 'yyyy-MM-dd'));
  };

  const filterJobsByWeek = (jobs: JobHistory[]) => {
    const weekStart = startOfWeek(currentWeek);
    const weekEnd = endOfWeek(currentWeek);
    
    return jobs.filter(job => {
      const jobDate = parseISO(job.completedDate);
      return isWithinInterval(jobDate, { start: weekStart, end: weekEnd });
    });
  };

  const filterJobsByStatus = (jobs: JobHistory[]) => {
    if (filterType === 'all') return jobs;
    return jobs.filter(job => job.status === filterType);
  };

  const filterJobsBySearch = (jobs: JobHistory[]) => {
    if (!searchTerm) return jobs;
    return jobs.filter(job => 
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredJobs = () => {
    let filteredJobs = jobHistory;
    
    // Apply tab filter first
    if (activeTab === 'calendar' && selectedDate) {
      filteredJobs = filterJobsByDate(filteredJobs);
    } else if (activeTab === 'weekly') {
      filteredJobs = filterJobsByWeek(filteredJobs);
    }
    
    // Apply other filters
    filteredJobs = filterJobsByStatus(filteredJobs);
    filteredJobs = filterJobsBySearch(filteredJobs);
    
    return filteredJobs;
  };

  const previousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const totalJobs = jobHistory.length;
  const approvedJobs = jobHistory.filter(job => job.status === 'approved').length;
  const totalHours = jobHistory.reduce((sum, job) => {
    const hours = parseFloat(job.duration.replace(' hours', ''));
    return sum + hours;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Job History</h1>
        <p className="text-gray-600">View and manage your completed jobs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{approvedJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle>Job History</CardTitle>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {getFilteredJobs().map((job) => (
                  <Card key={job.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{job.id}</span>
                            {getStatusBadge(job.status)}
                            {getRatingStars(job.rating)}
                          </div>
                          <h3 className="font-semibold text-lg text-gray-900">{job.serviceType}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{job.completedDate}</div>
                          <div className="text-sm text-gray-500">{job.completedTime}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{job.clientName} - {job.property}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Duration: {job.duration}</span>
                        </div>
                      </div>

                      {job.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {job.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Select Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {selectedDate ? (
                      <>
                        <h3 className="text-lg font-semibold">
                          Jobs for {format(selectedDate, 'MMMM d, yyyy')}
                        </h3>
                        {getFilteredJobs().length === 0 ? (
                          <Card>
                            <CardContent className="p-8 text-center">
                              <p className="text-gray-500">No jobs found for this date</p>
                            </CardContent>
                          </Card>
                        ) : (
                          getFilteredJobs().map((job) => (
                            <Card key={job.id} className="border">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-semibold">{job.serviceType}</h4>
                                    <p className="text-sm text-gray-600">{job.clientName}</p>
                                  </div>
                                  <div className="text-right">
                                    {getStatusBadge(job.status)}
                                    <div className="text-sm text-gray-500 mt-1">{job.completedTime}</div>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600">{job.location}</p>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </>
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Select a date to view jobs</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Week of {format(startOfWeek(currentWeek), 'MMMM d')} - {format(endOfWeek(currentWeek), 'MMMM d, yyyy')}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={previousWeek}>
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextWeek}>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {getFilteredJobs().length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500">No jobs found for this week</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {getFilteredJobs().map((job) => (
                      <Card key={job.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900">{job.id}</span>
                                {getStatusBadge(job.status)}
                                {getRatingStars(job.rating)}
                              </div>
                              <h3 className="font-semibold text-lg text-gray-900">{job.serviceType}</h3>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">{job.completedDate}</div>
                              <div className="text-sm text-gray-500">{job.completedTime}</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <User className="h-4 w-4" />
                              <span>{job.clientName} - {job.property}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>Duration: {job.duration}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianHistory;
