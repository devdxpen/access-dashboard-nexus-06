
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, User, Phone } from 'lucide-react';

interface CompanyProfile {
  name: string;
  location: string;
  contactPerson?: string;
  contactPhone?: string;
}

interface JobCompanySectionProps {
  companyProfile: CompanyProfile;
}

export const JobCompanySection: React.FC<JobCompanySectionProps> = ({ companyProfile }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <Label className="text-sm font-medium">Company Name</Label>
                <p className="text-lg font-semibold">{companyProfile.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <Label className="text-sm font-medium">Job Location</Label>
                <p className="text-base">{companyProfile.location}</p>
              </div>
            </div>
            
            {companyProfile.contactPerson && (
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium">Contact Person</Label>
                  <p className="text-base">{companyProfile.contactPerson}</p>
                </div>
              </div>
            )}
            
            {companyProfile.contactPhone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <Label className="text-sm font-medium">Contact Phone</Label>
                  <a 
                    href={`tel:${companyProfile.contactPhone}`}
                    className="text-base text-blue-600 hover:underline"
                  >
                    {companyProfile.contactPhone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Company profile information is read-only. 
          Contact your admin if any changes are needed.
        </p>
      </div>
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`block text-sm text-gray-600 ${className}`}>{children}</span>
);
