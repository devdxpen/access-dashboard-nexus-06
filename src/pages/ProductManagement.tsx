import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Filter,
  MoreVertical,
  Building2,
  DollarSign,
  Hash
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import AdminSidebar from '@/components/AdminSidebar';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample product data
  const products = [
    {
      id: 1,
      image: "/placeholder.svg",
      name: "Hikvision Security Camera",
      company: "Hikvision",
      price: 299.99,
      quantity: 45,
      description: "High-resolution IP security camera with night vision"
    },
    {
      id: 2,
      image: "/placeholder.svg",
      name: "Ahuja Sound System",
      company: "Ahuja",
      price: 1299.99,
      quantity: 12,
      description: "Professional sound system with amplifier"
    },
    {
      id: 3,
      image: "/placeholder.svg",
      name: "Network Cable Cat6",
      company: "D-Link",
      price: 2.99,
      quantity: 500,
      description: "High-speed ethernet cable for network installations"
    },
    {
      id: 4,
      image: "/placeholder.svg",
      name: "Samsung SSD 1TB",
      company: "Samsung",
      price: 149.99,
      quantity: 28,
      description: "High-performance solid state drive for storage"
    },
    {
      id: 5,
      image: "/placeholder.svg",
      name: "Bosch Power Drill",
      company: "Bosch",
      price: 199.99,
      quantity: 15,
      description: "Professional cordless drill for installation work"
    },
    {
      id: 6,
      image: "/placeholder.svg",
      name: "Cisco Router",
      company: "Cisco",
      price: 899.99,
      quantity: 8,
      description: "Enterprise-grade router for network infrastructure"
    },
    {
      id: 7,
      image: "/placeholder.svg",
      name: "LED Panel Light",
      company: "Philips",
      price: 79.99,
      quantity: 75,
      description: "Energy-efficient LED panel for office lighting"
    },
    {
      id: 8,
      image: "/placeholder.svg",
      name: "UPS Battery Backup",
      company: "APC",
      price: 349.99,
      quantity: 20,
      description: "Uninterruptible power supply for critical systems"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  const handleEdit = (productId: number) => {
    console.log('Edit product:', productId);
    // Add edit functionality here
  };

  const handleDelete = (productId: number) => {
    console.log('Delete product:', productId);
    // Add delete functionality here
  };

  const handleAddProduct = () => {
    console.log('Add new product');
    // Add new product functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Product Management</h1>
                <p className="text-sm text-gray-500">Manage your inventory and products</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button onClick={handleAddProduct} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-2xl">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Inventory Value</p>
                      <p className="text-3xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-2xl">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Stock</p>
                      <p className="text-3xl font-bold text-gray-900">{products.reduce((sum, p) => sum + p.quantity, 0)}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-2xl">
                      <Hash className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <span className="text-sm text-gray-500">
                      {filteredProducts.length} of {totalProducts} products
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Image</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-20">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-gray-50">
                          <TableCell>
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={product.image} alt={product.name} />
                              <AvatarFallback>
                                <Package className="h-6 w-6 text-gray-400" />
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Building2 className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-900">{product.company}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-gray-900">${product.price}</div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={product.quantity > 20 ? "default" : product.quantity > 5 ? "secondary" : "destructive"}
                              className="font-medium"
                            >
                              {product.quantity} units
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate text-gray-600" title={product.description}>
                              {product.description}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(product.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductManagement;