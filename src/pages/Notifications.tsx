
import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, AlertCircle, Clock, Settings } from 'lucide-react';

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Job #1234 Delayed',
      message: 'Technician John Doe reported a delay for installation at ABC Corp',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Job Completed',
      message: 'Maintenance job at XYZ Building has been completed successfully',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Client Registration',
      message: 'TechStart Inc. has registered and is waiting for approval',
      time: '2 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Technician Unavailable',
      message: 'Mike Johnson marked himself unavailable for tomorrow',
      time: '3 hours ago',
      read: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'destructive';
      case 'success':
        return 'default';
      case 'warning':
        return 'secondary';
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with important alerts and updates</p>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Notification Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Bell className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                    <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Unread</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {notifications.filter(n => !n.read).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Urgent</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {notifications.filter(n => n.type === 'urgent').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start p-4 rounded-lg border ${
                      notification.read ? 'bg-gray-50' : 'bg-white border-blue-200'
                    }`}
                  >
                    <div className="flex-shrink-0 mr-4">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getBadgeVariant(notification.type)}>
                            {notification.type}
                          </Badge>
                          <span className="text-sm text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
