
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Camera, Plus, X } from 'lucide-react';

interface Technician {
  id: string;
  name: string;
  image?: string;
}

interface JobCardData {
  id: string;
  title: string;
  assignedTechnicians: Technician[];
  additionalDetails: string;
  uploadedImages: string[];
  helpers: string[];
}

interface JobDetailsSectionProps {
  jobData: JobCardData;
  onUpdate: (data: Partial<JobCardData>) => void;
}

export const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ jobData, onUpdate }) => {
  const [newHelper, setNewHelper] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState(jobData.additionalDetails);

  const handleAddHelper = () => {
    if (newHelper.trim()) {
      const updatedHelpers = [...jobData.helpers, newHelper.trim()];
      onUpdate({ helpers: updatedHelpers });
      setNewHelper('');
    }
  };

  const handleRemoveHelper = (index: number) => {
    const updatedHelpers = jobData.helpers.filter((_, i) => i !== index);
    onUpdate({ helpers: updatedHelpers });
  };

  const handleDetailsChange = (value: string) => {
    setAdditionalDetails(value);
    onUpdate({ additionalDetails: value });
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const newImageUrl = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop`;
    const updatedImages = [...jobData.uploadedImages, newImageUrl];
    onUpdate({ uploadedImages: updatedImages });
  };

  return (
    <div className="space-y-6">
      {/* Assigned Technicians */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Assigned Technicians ({jobData.assignedTechnicians.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {jobData.assignedTechnicians.map((tech) => (
              <div key={tech.id} className="flex items-center gap-2 p-2 border rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={tech.image} />
                  <AvatarFallback>{tech.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Helpers */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Helpers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter helper name"
              value={newHelper}
              onChange={(e) => setNewHelper(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddHelper()}
            />
            <Button onClick={handleAddHelper} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {jobData.helpers.map((helper, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {helper}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={() => handleRemoveHelper(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="additional-details">
              Write notes about work progress, issues, or changes
            </Label>
            <Textarea
              id="additional-details"
              placeholder="e.g., 1 camera is defective, replaced with Hikvision because Ahuja was not available."
              value={additionalDetails}
              onChange={(e) => handleDetailsChange(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Image Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Work Progress Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleImageUpload} variant="outline" className="w-full">
            <Camera className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {jobData.uploadedImages.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden border">
                <img 
                  src={image} 
                  alt={`Work progress ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
