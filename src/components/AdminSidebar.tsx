
import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Building2, 
  BarChart3, 
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: true
    },
    {
      title: "Job Management",
      icon: Briefcase,
      href: "/jobs",
      active: false
    },
    {
      title: "Team Management",
      icon: Users,
      href: "/team",
      active: false
    },
    {
      title: "Client Management",
      icon: Building2,
      href: "/clients",
      active: false
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: "/reports",
      active: false
    },
    {
      title: "Notifications",
      icon: Bell,
      href: "/notifications",
      active: false
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      active: false
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40" />
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">AdminPro</h2>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                item.active 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0",
                item.active ? "text-white" : "text-gray-400"
              )} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.title}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Active Technicians Indicator */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">15 Active Technicians</span>
              </div>
              <p className="text-xs text-green-600 mt-1">Currently working on jobs</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSidebar;
