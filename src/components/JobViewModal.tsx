import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Building, 
  Wrench,
  Camera,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'created' | 'assigned' | 'note' | 'image' | 'status_change';
  user: string;
  userAvatar?: string;
  content?: string;
  images?: string[];
  statusChange?: {
    from: string;
    to: string;
  };
}

interface Job {
  id: string;
  clientName: string;
  property: string;
  site: string;
  serviceType: string;
  assignedTechnician: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'ongoing' | 'completed' | 'cancelled';
  description: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  timeline: TimelineEvent[];
}

interface JobViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

const JobViewModal: React.FC<JobViewModalProps> = ({ isOpen, onClose, job }) => {
  if (!job) return null;

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

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'assigned':
        return <UserCheck className="h-4 w-4 text-green-500" />;
      case 'note':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'image':
        return <Camera className="h-4 w-4 text-orange-500" />;
      case 'status_change':
        return <Clock className="h-4 w-4 text-indigo-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Job Details - {job.id}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(90vh-120px)]">
          {/* Job Information */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Job Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Client</label>
                    <p className="font-medium">{job.clientName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Property</label>
                    <p className="font-medium">{job.property}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Site</label>
                    <p className="font-medium">{job.site}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Service Type</label>
                    <p className="font-medium flex items-center gap-1">
                      <Wrench className="h-4 w-4" />
                      {job.serviceType}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-700">{job.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Scheduled Date</label>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {job.scheduledDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Scheduled Time</label>
                    <p className="font-medium flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.scheduledTime}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">{getStatusBadge(job.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Priority</label>
                    <div className="mt-1">{getPriorityBadge(job.priority)}</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned Technician</label>
                  <p className="font-medium flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {job.assignedTechnician}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Timeline */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Job Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] p-4">
                  <div className="space-y-4">
                    {job.timeline.map((event, index) => (
                      <div key={event.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-gray-200">
                            {getTimelineIcon(event.type)}
                          </div>
                          {index !== job.timeline.length - 1 && (
                            <div className="h-8 w-px bg-gray-200 mt-1" />
                          )}
                        </div>
                        
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {formatTimestamp(event.timestamp)}
                            </span>
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={event.userAvatar} />
                              <AvatarFallback className="text-xs">
                                {event.user.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{event.user}</span>
                          </div>
                          
                          {event.type === 'created' && (
                            <p className="text-sm text-gray-700">Job created</p>
                          )}
                          
                          {event.type === 'assigned' && (
                            <p className="text-sm text-gray-700">
                              Assigned to {event.user}
                            </p>
                          )}
                          
                          {event.type === 'note' && event.content && (
                            <div className="bg-gray-50 rounded-lg p-3 mt-2">
                              <p className="text-sm text-gray-700">{event.content}</p>
                            </div>
                          )}
                          
                          {event.type === 'image' && event.images && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-700 mb-2">Work images uploaded</p>
                              <div className="grid grid-cols-2 gap-2">
                                {event.images.map((image, imgIndex) => (
                                  <div key={imgIndex} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Camera className="h-8 w-8 text-gray-400" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {event.type === 'status_change' && event.statusChange && (
                            <p className="text-sm text-gray-700">
                              Status changed from <span className="font-medium">{event.statusChange.from}</span> to <span className="font-medium">{event.statusChange.to}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobViewModal;