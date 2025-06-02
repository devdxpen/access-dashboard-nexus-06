
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Eye, MapPin, Trash2 } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  address: string;
  instructions: string;
}

interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  mainAddress: string;
  properties: Property[];
}

const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    mainAddress: '',
    properties: [] as Property[]
  });

  // Mock data
  const clients: Client[] = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      contactPerson: 'Alice Brown',
      email: 'alice@techcorp.com',
      phone: '+1-555-0201',
      mainAddress: '123 Business Ave, City, State 12345',
      properties: [
        { id: '1', name: 'Main Office', address: '123 Business Ave, City, State 12345', instructions: 'Use back entrance after hours' },
        { id: '2', name: 'Warehouse', address: '456 Industrial Rd, City, State 12346', instructions: 'Contact security first' }
      ]
    },
    {
      id: '2',
      name: 'Green Valley Apartments',
      contactPerson: 'Robert Green',
      email: 'robert@greenvalley.com',
      phone: '+1-555-0202',
      mainAddress: '789 Valley Drive, City, State 12347',
      properties: [
        { id: '3', name: 'Building A', address: '789 Valley Drive, Building A, City, State 12347', instructions: 'Elevator access required' }
      ]
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name,
        contactPerson: client.contactPerson,
        email: client.email,
        phone: client.phone,
        mainAddress: client.mainAddress,
        properties: [...client.properties]
      });
    } else {
      setEditingClient(null);
      setFormData({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        mainAddress: '',
        properties: []
      });
    }
    setIsModalOpen(true);
  };

  const handleAddProperty = () => {
    const newProperty: Property = {
      id: Date.now().toString(),
      name: '',
      address: '',
      instructions: ''
    };
    setFormData({
      ...formData,
      properties: [...formData.properties, newProperty]
    });
  };

  const handleUpdateProperty = (index: number, field: keyof Property, value: string) => {
    const updatedProperties = [...formData.properties];
    updatedProperties[index] = { ...updatedProperties[index], [field]: value };
    setFormData({ ...formData, properties: updatedProperties });
  };

  const handleRemoveProperty = (index: number) => {
    const updatedProperties = formData.properties.filter((_, i) => i !== index);
    setFormData({ ...formData, properties: updatedProperties });
  };

  const handleSave = () => {
    console.log('Saving client:', formData);
    setIsModalOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by Client Name, Contact Person"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Clients Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Properties</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.contactPerson}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{client.properties.length}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(client)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Add/Edit Client Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingClient ? 'Edit Client' : 'Add New Client'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter client name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactPerson">Contact Person Name</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Enter contact person name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="clientEmail">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="clientPhone">Phone Number</Label>
              <Input
                id="clientPhone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mainAddress">Main Address</Label>
              <Textarea
                id="mainAddress"
                value={formData.mainAddress}
                onChange={(e) => setFormData({ ...formData, mainAddress: e.target.value })}
                placeholder="Enter main address"
                rows={3}
              />
            </div>

            {/* Properties Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Properties/Sites</Label>
                <Button variant="outline" size="sm" onClick={handleAddProperty}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </div>
              
              {formData.properties.map((property, index) => (
                <div key={property.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Property {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProperty(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`propertyName-${index}`}>Property Name/Identifier</Label>
                    <Input
                      id={`propertyName-${index}`}
                      value={property.name}
                      onChange={(e) => handleUpdateProperty(index, 'name', e.target.value)}
                      placeholder="Enter property name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`propertyAddress-${index}`}>Property Address</Label>
                    <Textarea
                      id={`propertyAddress-${index}`}
                      value={property.address}
                      onChange={(e) => handleUpdateProperty(index, 'address', e.target.value)}
                      placeholder="Enter property address"
                      rows={2}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`propertyInstructions-${index}`}>Special Instructions</Label>
                    <Textarea
                      id={`propertyInstructions-${index}`}
                      value={property.instructions}
                      onChange={(e) => handleUpdateProperty(index, 'instructions', e.target.value)}
                      placeholder="Enter any special instructions"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientManagement;
