
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, User, Phone, Mail, Calendar, FileText } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock job data - in real app, this would come from API
  const job = {
    id: id || '1',
    title: 'HVAC Installation - Office Building',
    description: 'Install new HVAC system in the main conference room including ductwork and electrical connections.',
    status: 'In Progress',
    priority: 'High',
    client: {
      name: 'ABC Corporation',
      contact: 'John Smith',
      phone: '+1-555-0123',
      email: 'john.smith@abccorp.com'
    },
    technician: {
      name: 'Mike Johnson',
      phone: '+1-555-0456',
      email: 'mike.johnson@company.com'
    },
    location: {
      address: '123 Business Ave, Suite 100, New York, NY 10001',
      coordinates: '40.7128,-74.0060'
    },
    schedule: {
      startDate: '2024-06-03',
      startTime: '09:00',
      estimatedDuration: '4 hours'
    },
    createdAt: '2024-06-01T10:30:00Z',
    updatedAt: '2024-06-03T08:15:00Z'
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'default';
      case 'in progress':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/jobs')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Details</h1>
              <p className="text-gray-600">Job ID: #{job.id}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Edit Job</Button>
              <Button>Update Status</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Job Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{job.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant={getStatusColor(job.status)}>{job.status}</Badge>
                      <Badge variant={getPriorityColor(job.priority)}>{job.priority}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{job.description}</p>
                </CardContent>
              </Card>

              {/* Location & Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Location & Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Address</h4>
                    <p className="text-gray-600">{job.location.address}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Start Date
                      </h4>
                      <p className="text-gray-600">{job.schedule.startDate}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Time & Duration
                      </h4>
                      <p className="text-gray-600">{job.schedule.startTime} ({job.schedule.estimatedDuration})</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Notes & Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-sm text-gray-600">Job created and assigned to technician</p>
                      <p className="text-xs text-gray-400">June 1, 2024 at 10:30 AM</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <p className="text-sm text-gray-600">Technician marked job as started</p>
                      <p className="text-xs text-gray-400">June 3, 2024 at 8:15 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{job.client.name}</h4>
                    <p className="text-gray-600">{job.client.contact}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{job.client.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">{job.client.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Assigned Technician */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Assigned Technician
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{job.technician.name}</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{job.technician.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">{job.technician.email}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Technician
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View on Map
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Print Job Sheet
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Duplicate Job
                  </Button>
                  <Button variant="destructive" size="sm" className="w-full">
                    Cancel Job
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
