
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus } from 'lucide-react';

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

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: Job | null;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, job }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    property: '',
    serviceType: '',
    description: '',
    location: '',
    scheduledDate: '',
    scheduledTime: '',
    priority: 'medium',
    assignedTechnician: '',
    technicianNotes: ''
  });

  // Mock data - in real app this would come from API
  const clients = [
    { id: '1', name: 'Acme Corp', properties: ['Main Office Building', 'Warehouse B', 'Store Location'] },
    { id: '2', name: 'Tech Solutions', properties: ['Data Center', 'Office Floor 1', 'Office Floor 2'] },
    { id: '3', name: 'Global Industries', properties: ['Warehouse A', 'Manufacturing Plant', 'Admin Building'] },
    { id: '4', name: 'Startup Inc', properties: ['Office Floor 3', 'Conference Center'] }
  ];

  const serviceTypes = ['Installation', 'Maintenance', 'Repair', 'Inspection', 'Emergency'];
  const technicians = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Emily Davis', 'Alex Brown'];

  const selectedClient = clients.find(client => client.name === formData.clientName);

  useEffect(() => {
    if (job) {
      setFormData({
        clientName: job.clientName,
        property: job.property,
        serviceType: job.serviceType,
        description: job.description,
        location: job.location,
        scheduledDate: job.scheduledDate,
        scheduledTime: job.scheduledTime,
        priority: job.priority,
        assignedTechnician: job.assignedTechnician,
        technicianNotes: ''
      });
    } else {
      setFormData({
        clientName: '',
        property: '',
        serviceType: '',
        description: '',
        location: '',
        scheduledDate: '',
        scheduledTime: '',
        priority: 'medium',
        assignedTechnician: '',
        technicianNotes: ''
      });
    }
  }, [job]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset property when client changes
      ...(field === 'clientName' ? { property: '' } : {})
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting job:', formData);
    // Here you would typically submit to your API
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {job ? 'Edit Job' : 'Create New Job'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Select Client *</Label>
              <div className="flex gap-2">
                <Select value={formData.clientName} onValueChange={(value) => handleInputChange('clientName', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.name}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property">Property/Site *</Label>
              <Select 
                value={formData.property} 
                onValueChange={(value) => handleInputChange('property', value)}
                disabled={!selectedClient}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a property" />
                </SelectTrigger>
                <SelectContent>
                  {selectedClient?.properties.map(property => (
                    <SelectItem key={property} value={property}>
                      {property}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Service Type and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the work to be performed..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location (Address)</Label>
            <Input
              id="location"
              placeholder="Enter full address..."
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>

          {/* Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date *</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledTime">Scheduled Time *</Label>
              <Input
                id="scheduledTime"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
              />
            </div>
          </div>

          {/* Technician Assignment */}
          <div className="space-y-2">
            <Label htmlFor="technician">Assign Technician</Label>
            <Select value={formData.assignedTechnician} onValueChange={(value) => handleInputChange('assignedTechnician', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a technician" />
              </SelectTrigger>
              <SelectContent>
                {technicians.map(tech => (
                  <SelectItem key={tech} value={tech}>
                    {tech}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Technician Notes */}
          <div className="space-y-2">
            <Label htmlFor="technicianNotes">Technician Notes (Optional)</Label>
            <Textarea
              id="technicianNotes"
              placeholder="Special instructions or notes for the technician..."
              value={formData.technicianNotes}
              onChange={(e) => handleInputChange('technicianNotes', e.target.value)}
              rows={2}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {job ? 'Update Job' : 'Create Job'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobModal;
