
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import JobManagement from "./pages/JobManagement";
import TeamManagement from "./pages/TeamManagement";
import ClientManagement from "./pages/ClientManagement";
import NotFound from "./pages/NotFound";
import TechnicianLogin from "./pages/technician/TechnicianLogin";
import TechnicianJobs from "./pages/technician/TechnicianJobs";
import TechnicianJobDetails from "./pages/technician/TechnicianJobDetails";
import TechnicianProfile from "./pages/technician/TechnicianProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<JobManagement />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/clients" element={<ClientManagement />} />
          <Route path="/index" element={<Index />} />
          
          {/* Technician Routes */}
          <Route path="/technician" element={<TechnicianLogin />} />
          <Route path="/technician/login" element={<TechnicianLogin />} />
          <Route path="/technician/jobs" element={<TechnicianJobs />} />
          <Route path="/technician/job/:id" element={<TechnicianJobDetails />} />
          <Route path="/technician/profile" element={<TechnicianProfile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
