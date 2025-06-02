
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import AdminSidebar from '@/components/AdminSidebar';
import { 
  Briefcase, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Check, 
  X, 
  Settings,
  Calendar,
  TrendingUp
} from 'lucide-react';

const AdminDashboardEnhanced = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [technicianJobCreation, setTechnicianJobCreation] = useState(true);
  const [approvalAction, setApprovalAction] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');

  // Mock data for pending approvals
  const pendingJobs = [
    {
      id: 'JOB-001',
      title: 'HVAC Installation',
      technician: 'John Smith',
      client: 'Acme Corp',
      completedDate: '2024-01-15',
      beforeImages: ['image1.jpg', 'image2.jpg'],
      afterImages: ['image3.jpg', 'image4.jpg'],
      notes: 'Installation completed successfully. All components tested and working.',
      status: 'pending_approval'
    },
    {
      id: 'JOB-002',
      title: 'Electrical Repair',
      technician: 'Sarah Johnson',
      client: 'Tech Solutions',
      completedDate: '2024-01-15',
      beforeImages: ['image5.jpg'],
      afterImages: ['image6.jpg', 'image7.jpg'],
      notes: 'Fixed wiring issues. Replaced old circuit breaker.',
      status: 'pending_approval'
    }
  ];

  // Mock data for technicians
  const technicians = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@company.com',
      activeJobs: 3,
      completedJobs: 45,
      canCreateJobs: true,
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      activeJobs: 2,
      completedJobs: 38,
      canCreateJobs: true,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@company.com',
      activeJobs: 1,
      completedJobs: 32,
      canCreateJobs: false,
      status: 'active'
    }
  ];

  const overviewData = [
    {
      title: "Total Jobs Today",
      value: "18",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+3 from yesterday"
    },
    {
      title: "Pending Approvals",
      value: pendingJobs.length.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "Requires attention"
    },
    {
      title: "Active Technicians",
      value: technicians.filter(t => t.status === 'active').length.toString(),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "All available"
    },
    {
      title: "Completed This Week",
      value: "89",
      icon: CheckCircle2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+15% from last week"
    }
  ];

  const handleJobView = (job) => {
    setSelectedJob(job);
    setIsApprovalModalOpen(true);
  };

  const handleApproval = (action) => {
    setApprovalAction(action);
    // Here you would typically update the job status
    console.log(`Job ${selectedJob?.id} ${action}`, approvalNotes);
    setIsApprovalModalOpen(false);
    setApprovalNotes('');
  };

  const toggleTechnicianJobCreation = (techId) => {
    // Update technician permissions
    console.log(`Toggle job creation for technician ${techId}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending_approval':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="lg:ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage jobs, technicians, and approvals</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {overviewData.map((item, index) => (
              <Card key={index}>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pending Job Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
                  Pending Job Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.technician} • {job.client}</p>
                          <p className="text-xs text-gray-500">Completed: {job.completedDate}</p>
                        </div>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => handleJobView(job)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technician Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Technician Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Allow Technician Job Creation</p>
                      <p className="text-sm text-gray-600">Enable technicians to create their own jobs</p>
                    </div>
                    <Switch 
                      checked={technicianJobCreation} 
                      onCheckedChange={setTechnicianJobCreation}
                    />
                  </div>
                  
                  {technicians.map((tech) => (
                    <div key={tech.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{tech.name}</p>
                        <p className="text-sm text-gray-600">{tech.activeJobs} active • {tech.completedJobs} completed</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`tech-${tech.id}`} className="text-sm">Can Create Jobs</Label>
                          <Switch 
                            id={`tech-${tech.id}`}
                            checked={tech.canCreateJobs} 
                            onCheckedChange={() => toggleTechnicianJobCreation(tech.id)}
                          />
                        </div>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="h-16 flex flex-col">
                  <Briefcase className="h-5 w-5 mb-1" />
                  <span>Create Job</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <Users className="h-5 w-5 mb-1" />
                  <span>Add Technician</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <TrendingUp className="h-5 w-5 mb-1" />
                  <span>View Reports</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <Settings className="h-5 w-5 mb-1" />
                  <span>Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Job Approval Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Job Review & Approval</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6">
              {/* Job Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Job ID</Label>
                  <p className="text-sm text-gray-600">{selectedJob.id}</p>
                </div>
                <div>
                  <Label className="font-medium">Title</Label>
                  <p className="text-sm text-gray-600">{selectedJob.title}</p>
                </div>
                <div>
                  <Label className="font-medium">Technician</Label>
                  <p className="text-sm text-gray-600">{selectedJob.technician}</p>
                </div>
                <div>
                  <Label className="font-medium">Client</Label>
                  <p className="text-sm text-gray-600">{selectedJob.client}</p>
                </div>
              </div>

              {/* Completion Notes */}
              <div>
                <Label className="font-medium">Completion Notes</Label>
                <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg mt-1">
                  {selectedJob.notes}
                </p>
              </div>

              {/* Before Images */}
              <div>
                <Label className="font-medium mb-2 block">Before Images</Label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedJob.beforeImages.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">{image}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After Images */}
              <div>
                <Label className="font-medium mb-2 block">After Images</Label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedJob.afterImages.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">{image}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval Notes */}
              <div>
                <Label htmlFor="approvalNotes" className="font-medium">Approval Notes (Optional)</Label>
                <Textarea
                  id="approvalNotes"
                  placeholder="Add any feedback or notes..."
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsApprovalModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => handleApproval('rejected')}>
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button onClick={() => handleApproval('approved')}>
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboardEnhanced;
