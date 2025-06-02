
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft,
  Clock,
  MapPin,
  User,
  Calendar,
  Play,
  Camera,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const TechnicianJobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [jobStatus, setJobStatus] = useState('assigned');

  // Mock job data
  const job = {
    id: 'JOB-001',
    clientName: 'Acme Corp',
    property: 'Main Office Building',
    serviceType: 'HVAC Installation',
    scheduledTime: '09:00',
    scheduledDate: '2024-01-15',
    status: 'assigned',
    location: '123 Business St, City',
    priority: 'high',
    description: 'Install new HVAC system in the main conference room. Ensure proper ventilation and test all connections before completion.',
    clientContact: 'John Manager',
    clientPhone: '+1-555-0123'
  };

  const handleStartJob = () => {
    setJobStatus('in-progress');
  };

  const handleCompleteJob = () => {
    setJobStatus('completed');
    navigate('/technician/jobs');
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      assigned: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityColors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-orange-100 text-orange-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={priorityColors[priority as keyof typeof priorityColors]}>{priority}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/technician/jobs')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Job Details</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {getStatusBadge(jobStatus)}
            {getPriorityBadge(job.priority)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        {/* Job Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{job.id}</span>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <AlertCircle className="h-4 w-4" />
                <span>{job.priority} priority</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{job.serviceType}</h3>
              <p className="text-gray-600">{job.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="font-medium">{job.clientName}</span>
                    <p className="text-gray-500">{job.property}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{job.location}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{job.scheduledDate}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{job.scheduledTime}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Contact Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">Contact Person:</span> {job.clientContact}</p>
              <p><span className="font-medium">Phone:</span> {job.clientPhone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Notes Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Technician Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label htmlFor="notes">Add notes about this job</Label>
              <Textarea
                id="notes"
                placeholder="Enter any notes, observations, or updates..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {jobStatus === 'assigned' && (
            <Button 
              onClick={handleStartJob}
              className="w-full h-12 bg-green-600 hover:bg-green-700"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Job (Clock-in)
            </Button>
          )}
          
          {jobStatus === 'in-progress' && (
            <>
              <Button 
                variant="outline"
                className="w-full h-12"
              >
                <Camera className="h-5 w-5 mr-2" />
                Upload Photo/Proof
              </Button>
              
              <Button 
                onClick={handleCompleteJob}
                className="w-full h-12 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Complete Job
              </Button>
            </>
          )}
          
          {jobStatus === 'completed' && (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-medium text-green-600">Job Completed!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TechnicianJobDetails;
