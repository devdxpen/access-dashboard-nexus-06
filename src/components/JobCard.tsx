
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobDetailsSection } from './JobCard/JobDetailsSection';
import { JobServicesSection } from './JobCard/JobServicesSection';
import { JobCompanySection } from './JobCard/JobCompanySection';

interface Technician {
  id: string;
  name: string;
  image?: string;
}

interface ServiceItem {
  id: string;
  name: string;
  quantity: number;
  used: boolean;
}

interface JobCardData {
  id: string;
  title: string;
  assignedTechnicians: Technician[];
  serviceInstructions: string;
  serviceItems: ServiceItem[];
  workingTime: {
    default: number;
    actual: number;
    confirmed: boolean;
  };
  companyProfile: {
    name: string;
    location: string;
    contactPerson?: string;
    contactPhone?: string;
  };
  additionalDetails: string;
  uploadedImages: string[];
  helpers: string[];
}

interface JobCardProps {
  jobData: JobCardData;
  onUpdate: (data: Partial<JobCardData>) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ jobData, onUpdate }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Job Card - {jobData.title}</CardTitle>
          <p className="text-sm text-gray-600">Job ID: {jobData.id}</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="company">Company Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <JobDetailsSection
                jobData={jobData}
                onUpdate={onUpdate}
              />
            </TabsContent>
            
            <TabsContent value="services" className="mt-6">
              <JobServicesSection
                jobData={jobData}
                onUpdate={onUpdate}
              />
            </TabsContent>
            
            <TabsContent value="company" className="mt-6">
              <JobCompanySection
                companyProfile={jobData.companyProfile}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
