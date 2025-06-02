
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  MapPin, 
  User,
  Briefcase,
  Upload,
  Play,
  Check
} from 'lucide-react';

const TechnicianJobManager = () => {
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [isCompleteJobOpen, setIsCompleteJobOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    address: '',
    priority: 'medium',
    estimatedDuration: ''
  });

  // Mock data for technician's jobs
  const myJobs = [
    {
      id: 'JOB-001',
      title: 'HVAC Installation',
      customer: 'John Doe',
      address: '123 Main St, City',
      status: 'assigned',
      priority: 'high',
      createdDate: '2024-01-15',
      estimatedDuration: '4 hours'
    },
    {
      id: 'JOB-002',
      title: 'Electrical Repair',
      customer: 'Jane Smith',
      address: '456 Oak Ave, City',
      status: 'in_progress',
      priority: 'medium',
      createdDate: '2024-01-14',
      estimatedDuration: '2 hours'
    },
    {
      id: 'JOB-003',
      title: 'Plumbing Fix',
      customer: 'Bob Wilson',
      address: '789 Pine St, City',
      status: 'completed',
      priority: 'low',
      createdDate: '2024-01-13',
      estimatedDuration: '1 hour'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'assigned':
        return <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending_approval':
        return <Badge className="bg-purple-100 text-purple-800">Pending Approval</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleCreateJob = () => {
    console.log('Creating job:', jobForm);
    setIsCreateJobOpen(false);
    setJobForm({
      title: '',
      description: '',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      address: '',
      priority: 'medium',
      estimatedDuration: ''
    });
  };

  const handleStartJob = (job) => {
    console.log('Starting job:', job.id);
    // Update job status to in_progress
  };

  const handleCompleteJob = (job) => {
    setSelectedJob(job);
    setIsCompleteJobOpen(true);
  };

  const handleSubmitCompletion = () => {
    console.log('Submitting job completion for:', selectedJob?.id);
    setIsCompleteJobOpen(false);
    setSelectedJob(null);
  };

  const statsData = [
    {
      title: "My Jobs Today",
      value: myJobs.filter(job => job.createdDate === '2024-01-15').length.toString(),
      icon: Briefcase,
      color: "text-blue-600"
    },
    {
      title: "In Progress",
      value: myJobs.filter(job => job.status === 'in_progress').length.toString(),
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Completed Today",
      value: myJobs.filter(job => job.status === 'completed' && job.createdDate === '2024-01-15').length.toString(),
      icon: CheckCircle2,
      color: "text-green-600"
    },
    {
      title: "Pending Approval",
      value: myJobs.filter(job => job.status === 'pending_approval').length.toString(),
      icon: AlertCircle,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h1>
        <p className="text-gray-600">Manage your assigned and self-created jobs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jobs List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My Jobs</CardTitle>
            <Button onClick={() => setIsCreateJobOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myJobs.map((job) => (
              <Card key={job.id} className="border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {job.customer}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.estimatedDuration}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(job.status)}
                      {getPriorityBadge(job.priority)}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {job.status === 'assigned' && (
                      <Button size="sm" onClick={() => handleStartJob(job)}>
                        <Play className="h-4 w-4 mr-1" />
                        Start Job
                      </Button>
                    )}
                    {job.status === 'in_progress' && (
                      <Button size="sm" onClick={() => handleCompleteJob(job)}>
                        <Check className="h-4 w-4 mr-1" />
                        Complete Job
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Job Modal */}
      <Dialog open={isCreateJobOpen} onOpenChange={setIsCreateJobOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                  placeholder="Enter job title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={jobForm.priority} onValueChange={(value) => setJobForm({...jobForm, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={jobForm.description}
                onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                placeholder="Enter job description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={jobForm.customerName}
                  onChange={(e) => setJobForm({...jobForm, customerName: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customerPhone">Customer Phone</Label>
                <Input
                  id="customerPhone"
                  value={jobForm.customerPhone}
                  onChange={(e) => setJobForm({...jobForm, customerPhone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={jobForm.customerEmail}
                  onChange={(e) => setJobForm({...jobForm, customerEmail: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Estimated Duration</Label>
                <Input
                  id="duration"
                  value={jobForm.estimatedDuration}
                  onChange={(e) => setJobForm({...jobForm, estimatedDuration: e.target.value})}
                  placeholder="e.g. 2 hours"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Service Address</Label>
              <Textarea
                id="address"
                value={jobForm.address}
                onChange={(e) => setJobForm({...jobForm, address: e.target.value})}
                placeholder="Enter complete service address"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateJobOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateJob}>
              Create Job
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Complete Job Modal */}
      <Dialog open={isCompleteJobOpen} onOpenChange={setIsCompleteJobOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Complete Job - {selectedJob?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-medium mb-2 block">Upload Before Images</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="aspect-square flex flex-col items-center justify-center h-24">
                  <Camera className="h-6 w-6 mb-1" />
                  <span className="text-xs">Add Photo</span>
                </Button>
                <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Before 1</span>
                </div>
                <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Before 2</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="font-medium mb-2 block">Upload After Images</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="aspect-square flex flex-col items-center justify-center h-24">
                  <Camera className="h-6 w-6 mb-1" />
                  <span className="text-xs">Add Photo</span>
                </Button>
                <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-500">After 1</span>
                </div>
                <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-500">After 2</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="completionNotes">Completion Notes</Label>
              <Textarea
                id="completionNotes"
                placeholder="Describe the work completed, any issues encountered, or additional notes..."
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsCompleteJobOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitCompletion}>
              <Upload className="h-4 w-4 mr-2" />
              Submit for Approval
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TechnicianJobManager;
