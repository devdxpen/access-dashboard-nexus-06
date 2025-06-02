
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  User,
  Phone,
  Mail,
  LogOut,
  Lock,
  Info
} from 'lucide-react';

const TechnicianProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/technician/login');
  };

  const technician = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1-555-0123',
    employeeId: 'TECH-001',
    role: 'Senior Technician'
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
            <h1 className="text-lg font-semibold text-gray-900">Profile & Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{technician.name}</h3>
                <p className="text-gray-600">{technician.role}</p>
                <p className="text-sm text-gray-500">ID: {technician.employeeId}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{technician.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{technician.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-12"
            >
              <Lock className="h-5 w-5 mr-3" />
              Change Password
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-12"
            >
              <User className="h-5 w-5 mr-3" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* App Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">App Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Info className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">App Version</span>
              </div>
              <span className="text-gray-500">v1.0.0</span>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button 
          onClick={handleLogout}
          variant="destructive"
          className="w-full h-12"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </main>
    </div>
  );
};

export default TechnicianProfile;
