
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  Edit, 
  X as Cancel, 
  UserCheck,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminSidebar from '@/components/AdminSidebar';
import CreateJobModal from '@/components/CreateJobModal';

interface Job {
  id: string;
  clientName: string;
  property: string;
  serviceType: string;
  assignedTechnician: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'ongoing' | 'completed' | 'cancelled';
  description: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
}

const JobManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [technicianFilter, setTechnicianFilter] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Mock data - in real app this would come from API
  const jobs: Job[] = [
    {
      id: 'JOB-001',
      clientName: 'Acme Corp',
      property: 'Main Office Building',
      serviceType: 'Installation',
      assignedTechnician: 'John Smith',
      scheduledDate: '2024-01-15',
      scheduledTime: '09:00',
      status: 'pending',
      description: 'Install new HVAC system',
      location: '123 Business St, City',
      priority: 'high'
    },
    {
      id: 'JOB-002',
      clientName: 'Tech Solutions',
      property: 'Data Center',
      serviceType: 'Maintenance',
      assignedTechnician: 'Sarah Johnson',
      scheduledDate: '2024-01-16',
      scheduledTime: '14:00',
      status: 'ongoing',
      description: 'Routine server maintenance',
      location: '456 Tech Ave, City',
      priority: 'medium'
    },
    {
      id: 'JOB-003',
      clientName: 'Global Industries',
      property: 'Warehouse A',
      serviceType: 'Repair',
      assignedTechnician: 'Mike Wilson',
      scheduledDate: '2024-01-14',
      scheduledTime: '11:30',
      status: 'completed',
      description: 'Fix electrical wiring issues',
      location: '789 Industrial Blvd, City',
      priority: 'high'
    },
    {
      id: 'JOB-004',
      clientName: 'Startup Inc',
      property: 'Office Floor 3',
      serviceType: 'Installation',
      assignedTechnician: 'Emily Davis',
      scheduledDate: '2024-01-17',
      scheduledTime: '10:00',
      status: 'pending',
      description: 'Install security cameras',
      location: '321 Innovation St, City',
      priority: 'low'
    }
  ];

  const technicians = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Emily Davis'];
  const itemsPerPage = 10;

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      ongoing: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      completed: 'bg-green-100 text-green-800 hover:bg-green-100',
      cancelled: 'bg-red-100 text-red-800 hover:bg-red-100'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityColors = {
      high: 'bg-red-100 text-red-800 hover:bg-red-100',
      medium: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
      low: 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    };
    return <Badge variant="outline" className={priorityColors[priority as keyof typeof priorityColors]}>{priority}</Badge>;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.assignedTechnician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesTechnician = technicianFilter === 'all' || job.assignedTechnician === technicianFilter;
    
    return matchesSearch && matchesStatus && matchesTechnician;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(paginatedJobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId: string, checked: boolean) => {
    if (checked) {
      setSelectedJobs(prev => [...prev, jobId]);
    } else {
      setSelectedJobs(prev => prev.filter(id => id !== jobId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="lg:ml-64">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Management</h1>
            <p className="text-gray-600">Manage and track all jobs across your organization</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <CardTitle>All Jobs</CardTitle>
                
                <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Job
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by Job ID, Client Name, or Technician..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={technicianFilter} onValueChange={setTechnicianFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Technicians</SelectItem>
                      {technicians.map(tech => (
                        <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Bulk Actions */}
              {selectedJobs.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">
                      {selectedJobs.length} job(s) selected
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Bulk Reassign
                      </Button>
                      <Button variant="outline" size="sm">
                        Bulk Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Jobs Table */}
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedJobs.length === paginatedJobs.length && paginatedJobs.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Job ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Property/Site</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedJobs.includes(job.id)}
                            onCheckedChange={(checked) => handleSelectJob(job.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{job.id}</TableCell>
                        <TableCell>{job.clientName}</TableCell>
                        <TableCell>{job.property}</TableCell>
                        <TableCell>{job.serviceType}</TableCell>
                        <TableCell>{job.assignedTechnician}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {job.scheduledDate}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              {job.scheduledTime}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                        <TableCell>{getPriorityBadge(job.priority)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setEditingJob(job)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Cancel className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredJobs.length)} of {filteredJobs.length} jobs
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Job Modal */}
      <CreateJobModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      {/* Edit Job Modal */}
      {editingJob && (
        <CreateJobModal 
          isOpen={!!editingJob} 
          onClose={() => setEditingJob(null)}
          job={editingJob}
        />
      )}
    </div>
  );
};

export default JobManagement;
