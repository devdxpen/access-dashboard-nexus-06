
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Building2, 
  CreditCard, 
  Users, 
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/super-admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Companies',
    url: '/super-admin/companies',
    icon: Building2,
  },
  {
    title: 'Subscription Plans',
    url: '/super-admin/subscriptions',
    icon: CreditCard,
  },
];

export function SuperAdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Super Admin</h2>
            <p className="text-xs text-sidebar-foreground/70">System Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className="w-full"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => navigate('/super-admin/login')}
                className="w-full text-red-600 hover:text-red-700"
              >
                <LogOut />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
