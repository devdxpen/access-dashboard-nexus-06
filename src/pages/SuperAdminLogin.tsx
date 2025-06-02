
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuperAdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    console.log('Super Admin login:', credentials);
    navigate('/super-admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Super Admin Portal</CardTitle>
          <p className="text-gray-600">Access administrative controls</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="super.admin@flashbiz.com"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Super Admin Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Other portals</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
                <Building2 className="h-4 w-4 mr-2" />
                Admin Portal
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/technician/login')}>
                Technician Portal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminLogin;
