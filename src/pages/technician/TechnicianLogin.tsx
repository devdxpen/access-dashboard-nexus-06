
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Building2, Lock, User } from 'lucide-react';

const TechnicianLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (username && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to your job dashboard",
        });
        navigate('/technician/jobs');
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter both username and password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 px-4">
      <div className="absolute inset-0 bg-black/10"></div>
      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Technician Portal</CardTitle>
          <p className="text-gray-600">Sign in to manage your jobs</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username/Email/Phone
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 font-medium bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button className="text-sm text-green-600 hover:text-green-700 transition-colors">
              Forgot Password?
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianLogin;
