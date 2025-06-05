
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, CheckCircle, Edit } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  quantity: number;
  used: boolean;
}

interface JobCardData {
  serviceInstructions: string;
  serviceItems: ServiceItem[];
  workingTime: {
    default: number;
    actual: number;
    confirmed: boolean;
  };
}

interface JobServicesSectionProps {
  jobData: JobCardData;
  onUpdate: (data: Partial<JobCardData>) => void;
}

export const JobServicesSection: React.FC<JobServicesSectionProps> = ({ jobData, onUpdate }) => {
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState(jobData.serviceInstructions);
  const [actualTime, setActualTime] = useState(jobData.workingTime.actual);

  const handleItemUsedChange = (itemId: string, used: boolean) => {
    const updatedItems = jobData.serviceItems.map(item =>
      item.id === itemId ? { ...item, used } : item
    );
    onUpdate({ serviceItems: updatedItems });
  };

  const handleInstructionsEdit = () => {
    if (isEditingInstructions) {
      onUpdate({ serviceInstructions: editedInstructions });
    }
    setIsEditingInstructions(!isEditingInstructions);
  };

  const handleTimeConfirmation = (confirmed: boolean) => {
    onUpdate({ 
      workingTime: { 
        ...jobData.workingTime, 
        actual: actualTime,
        confirmed 
      } 
    });
  };

  const usedItemsCount = jobData.serviceItems.filter(item => item.used).length;

  return (
    <div className="space-y-6">
      {/* Service Instructions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Service Instructions</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleInstructionsEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditingInstructions ? 'Save' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isEditingInstructions ? (
            <Textarea
              value={editedInstructions}
              onChange={(e) => setEditedInstructions(e.target.value)}
              rows={6}
              placeholder="Enter service instructions..."
            />
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="whitespace-pre-wrap">{jobData.serviceInstructions}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Required Items</span>
            <span className="text-sm font-normal text-gray-500">
              {usedItemsCount}/{jobData.serviceItems.length} used
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobData.serviceItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Checkbox
                  checked={item.used}
                  onCheckedChange={(checked) => handleItemUsedChange(item.id, checked as boolean)}
                />
                <div className="flex-1">
                  <span className={`font-medium ${item.used ? 'line-through text-gray-500' : ''}`}>
                    {item.quantity}x {item.name}
                  </span>
                </div>
                {item.used && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Working Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Working Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Default Time (hours)</Label>
              <Input 
                type="number" 
                value={jobData.workingTime.default}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label>Actual Time (hours)</Label>
              <Input 
                type="number" 
                value={actualTime}
                onChange={(e) => setActualTime(Number(e.target.value))}
                step="0.5"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={jobData.workingTime.confirmed}
              onCheckedChange={handleTimeConfirmation}
            />
            <Label className="text-sm">
              Confirm working time is accurate
            </Label>
          </div>
          
          {jobData.workingTime.confirmed && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ Working time confirmed: {actualTime} hours
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
