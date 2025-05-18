import React, { useState, useEffect } from 'react';

// Define the Product type based on your schema
interface Product {
  productId: string;
  productName: string;
  warehouseId: string;
  warehouseName: string; // Added for display purposes
  categoryId: string;
  categoryName: string; // Added for display purposes
  clientId?: string | null;
  clientName?: string | null; // Added for display purposes
  price: number; // Current price
  stock: number; // Added to track inventory
  createdAt: string;
}

// Mock warehouse data
const mockWarehouses = [
  { warehouseId: 'wh-001', warehouseName: 'Main Warehouse' },
  { warehouseId: 'wh-002', warehouseName: 'Secondary Warehouse' },
];

// Mock category data
const mockCategories = [
  { categoryId: 'cat-001', categoryName: 'Electronics' },
  { categoryId: 'cat-002', categoryName: 'Furniture' },
  { categoryId: 'cat-003', categoryName: 'Office Supplies' },
];

// Mock client data
const mockClients = [
  { clientId: 'cl-001', clientName: 'TechCorp Inc.' },
  { clientId: 'cl-002', clientName: 'Office Solutions' },
  { clientId: null, clientName: 'No Client' },
];

// Initial mock products
const initialProducts: Product[] = [
  {
    productId: 'prod-001',
    productName: 'Dell XPS 15 Laptop',
    warehouseId: 'wh-001',
    warehouseName: 'Main Warehouse',
    categoryId: 'cat-001',
    categoryName: 'Electronics',
    clientId: 'cl-001',
    clientName: 'TechCorp Inc.',
    price: 1899.99,
    stock: 12,
    createdAt: new Date().toISOString(),
  },
  {
    productId: 'prod-002',
    productName: 'Ergonomic Office Chair',
    warehouseId: 'wh-002',
    warehouseName: 'Secondary Warehouse',
    categoryId: 'cat-002',
    categoryName: 'Furniture',
    clientId: 'cl-002',
    clientName: 'Office Solutions',
    price: 299.95,
    stock: 25,
    createdAt: new Date().toISOString(),
  },
  {
    productId: 'prod-003',
    productName: 'Wireless Keyboard and Mouse Combo',
    warehouseId: 'wh-001',
    warehouseName: 'Main Warehouse',
    categoryId: 'cat-001',
    categoryName: 'Electronics',
    clientId: null,
    clientName: null,
    price: 89.99,
    stock: 47,
    createdAt: new Date().toISOString(),
  },
  {
    productId: 'prod-004',
    productName: 'Premium Paper Reams (500 sheets)',
    warehouseId: 'wh-001',
    warehouseName: 'Main Warehouse',
    categoryId: 'cat-003',
    categoryName: 'Office Supplies',
    clientId: 'cl-002',
    clientName: 'Office Solutions',
    price: 12.5,
    stock: 156,
    createdAt: new Date().toISOString(),
  },
  {
    productId: 'prod-005',
    productName: 'Executive Desk',
    warehouseId: 'wh-002',
    warehouseName: 'Secondary Warehouse',
    categoryId: 'cat-002',
    categoryName: 'Furniture',
    clientId: null,
    clientName: null,
    price: 599.99,
    stock: 8,
    createdAt: new Date().toISOString(),
  },
];

// Product form type for add/edit operations
interface ProductFormData {
  productName: string;
  warehouseId: string;
  categoryId: string;
  clientId: string | null;
  price: number;
  stock: number;
}

const ProductsPage: React.FC = () => {
  // State for products list
  const [products, setProducts] = useState<Product[]>([]);

  // State for product form (add/edit)
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    warehouseId: mockWarehouses[0].warehouseId,
    categoryId: mockCategories[0].categoryId,
    clientId: null,
    price: 0,
    stock: 0,
  });

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // State for filtering and sorting
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterWarehouse, setFilterWarehouse] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<string>('productName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Load products from localStorage on initial mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with mock data if nothing in localStorage
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  // Handle saving products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Convert to number for number inputs
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value === 'null' ? null : value,
      });
    }
  };

  // Open modal for adding new product
  const handleAddProduct = () => {
    setFormData({
      productName: '',
      warehouseId: mockWarehouses[0].warehouseId,
      categoryId: mockCategories[0].categoryId,
      clientId: null,
      price: 0,
      stock: 0,
    });
    setEditingProductId(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing product
  const handleEditProduct = (product: Product) => {
    setFormData({
      productName: product.productName,
      warehouseId: product.warehouseId,
      categoryId: product.categoryId,
      clientId: product.clientId,
      price: product.price,
      stock: product.stock,
    });
    setEditingProductId(product.productId);
    setIsModalOpen(true);
  };

  // Save product (add or update)
  const handleSaveProduct = () => {
    if (editingProductId) {
      // Update existing product
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.productId === editingProductId
            ? {
                ...product,
                productName: formData.productName,
                warehouseId: formData.warehouseId,
                warehouseName:
                  mockWarehouses.find(
                    w => w.warehouseId === formData.warehouseId
                  )?.warehouseName || '',
                categoryId: formData.categoryId,
                categoryName:
                  mockCategories.find(c => c.categoryId === formData.categoryId)
                    ?.categoryName || '',
                clientId: formData.clientId,
                clientName:
                  mockClients.find(c => c.clientId === formData.clientId)
                    ?.clientName || null,
                price: formData.price,
                stock: formData.stock,
              }
            : product
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        productId: `prod-${Date.now()}`, // Generate unique ID
        productName: formData.productName,
        warehouseId: formData.warehouseId,
        warehouseName:
          mockWarehouses.find(w => w.warehouseId === formData.warehouseId)
            ?.warehouseName || '',
        categoryId: formData.categoryId,
        categoryName:
          mockCategories.find(c => c.categoryId === formData.categoryId)
            ?.categoryName || '',
        clientId: formData.clientId,
        clientName:
          mockClients.find(c => c.clientId === formData.clientId)?.clientName ||
          null,
        price: formData.price,
        stock: formData.stock,
        createdAt: new Date().toISOString(),
      };

      setProducts(prevProducts => [...prevProducts, newProduct]);
    }

    setIsModalOpen(false);
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prevProducts =>
        prevProducts.filter(product => product.productId !== productId)
      );
    }
  };

  // Apply filters and sorting to products
  const filteredAndSortedProducts = products
    .filter(product => {
      // Apply category filter
      if (filterCategory !== 'all' && product.categoryId !== filterCategory) {
        return false;
      }

      // Apply warehouse filter
      if (
        filterWarehouse !== 'all' &&
        product.warehouseId !== filterWarehouse
      ) {
        return false;
      }

      // Apply search term
      if (
        searchTerm &&
        !product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      const fieldA = a[sortField as keyof Product];
      const fieldB = b[sortField as keyof Product];

      if (fieldA === undefined || fieldB === undefined) return 0;

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }

      return 0;
    });

  // Handle sorting change
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(prevDirection =>
        prevDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      // New field, reset to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold mb-6'>Products Management</h1>

      {/* Filters and Actions */}
      <div className='bg-white rounded-lg shadow p-4 mb-6'>
        <div className='flex flex-col md:flex-row md:items-center gap-4'>
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Search products...'
              className='w-full p-2 border border-gray-300 rounded'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='flex-1 md:flex-initial'>
            <select
              className='w-full p-2 border border-gray-300 rounded'
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              <option value='all'>All Categories</option>
              {mockCategories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className='flex-1 md:flex-initial'>
            <select
              className='w-full p-2 border border-gray-300 rounded'
              value={filterWarehouse}
              onChange={e => setFilterWarehouse(e.target.value)}
            >
              <option value='all'>All Warehouses</option>
              {mockWarehouses.map(warehouse => (
                <option
                  key={warehouse.warehouseId}
                  value={warehouse.warehouseId}
                >
                  {warehouse.warehouseName}
                </option>
              ))}
            </select>
          </div>

          <div className='flex-initial'>
            <button
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => handleSort('productName')}
                >
                  Name
                  {sortField === 'productName' && (
                    <span className='ml-1'>
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
                <th
                  className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => handleSort('categoryName')}
                >
                  Category
                  {sortField === 'categoryName' && (
                    <span className='ml-1'>
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
                <th
                  className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => handleSort('warehouseName')}
                >
                  Warehouse
                  {sortField === 'warehouseName' && (
                    <span className='ml-1'>
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
                <th
                  className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => handleSort('price')}
                >
                  Price
                  {sortField === 'price' && (
                    <span className='ml-1'>
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
                <th
                  className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => handleSort('stock')}
                >
                  Stock
                  {sortField === 'stock' && (
                    <span className='ml-1'>
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Client
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredAndSortedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className='px-4 py-4 text-center text-gray-500'
                  >
                    No products found. Try adjusting your filters or add a new
                    product.
                  </td>
                </tr>
              ) : (
                filteredAndSortedProducts.map(product => (
                  <tr key={product.productId} className='hover:bg-gray-50'>
                    <td className='px-4 py-4 whitespace-nowrap'>
                      <div className='font-medium text-gray-900'>
                        {product.productName}
                      </div>
                      <div className='text-xs text-gray-500'>
                        ID: {product.productId}
                      </div>
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap'>
                      <span className='px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800'>
                        {product.categoryName}
                      </span>
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap'>
                      {product.warehouseName}
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap'>
                      ${product.price.toFixed(2)}
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap'>
                      <span
                        className={`${
                          product.stock > 10
                            ? 'text-green-600'
                            : product.stock > 0
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap'>
                      {product.clientName || 'No Client'}
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap text-sm font-medium'>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className='text-indigo-600 hover:text-indigo-900 mr-3'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.productId)}
                        className='text-red-600 hover:text-red-900'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Stats */}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white rounded-lg shadow p-4'>
          <div className='text-sm text-gray-500'>Total Products</div>
          <div className='text-xl font-bold'>{products.length}</div>
        </div>
        <div className='bg-white rounded-lg shadow p-4'>
          <div className='text-sm text-gray-500'>Low Stock Items</div>
          <div className='text-xl font-bold'>
            {products.filter(p => p.stock <= 10).length}
          </div>
        </div>
        <div className='bg-white rounded-lg shadow p-4'>
          <div className='text-sm text-gray-500'>Total Stock Value</div>
          <div className='text-xl font-bold'>
            $
            {products
              .reduce((sum, item) => sum + item.price * item.stock, 0)
              .toFixed(2)}
          </div>
        </div>
        <div className='bg-white rounded-lg shadow p-4'>
          <div className='text-sm text-gray-500'>Average Price</div>
          <div className='text-xl font-bold'>
            $
            {(
              products.reduce((sum, item) => sum + item.price, 0) /
              products.length
            ).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>
              {editingProductId ? 'Edit Product' : 'Add New Product'}
            </h2>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Product Name
                </label>
                <input
                  type='text'
                  name='productName'
                  value={formData.productName}
                  onChange={handleInputChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Category
                </label>
                <select
                  name='categoryId'
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className='w-full p-2 border border-gray-300 rounded'
                >
                  {mockCategories.map(category => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Warehouse
                </label>
                <select
                  name='warehouseId'
                  value={formData.warehouseId}
                  onChange={handleInputChange}
                  className='w-full p-2 border border-gray-300 rounded'
                >
                  {mockWarehouses.map(warehouse => (
                    <option
                      key={warehouse.warehouseId}
                      value={warehouse.warehouseId}
                    >
                      {warehouse.warehouseName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Client (Optional)
                </label>
                <select
                  name='clientId'
                  value={formData.clientId || 'null'}
                  onChange={handleInputChange}
                  className='w-full p-2 border border-gray-300 rounded'
                >
                  {mockClients.map(client => (
                    <option
                      key={client.clientId || 'null'}
                      value={client.clientId || 'null'}
                    >
                      {client.clientName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Price ($)
                </label>
                <input
                  type='number'
                  name='price'
                  value={formData.price}
                  onChange={handleInputChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  min='0'
                  step='0.01'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Stock Quantity
                </label>
                <input
                  type='number'
                  name='stock'
                  value={formData.stock}
                  onChange={handleInputChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  min='0'
                  required
                />
              </div>
            </div>

            <div className='mt-6 flex justify-end space-x-3'>
              <button
                className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                onClick={handleSaveProduct}
              >
                {editingProductId ? 'Update' : 'Add'} Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
