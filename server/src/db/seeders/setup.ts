import * as fs from 'fs';
import * as path from 'path';
import { logger } from './utils/logger';

// this script is not needed anymore, it was generated to setup the seeders

/**
 * Creates the necessary directory structure for seeders data files
 */
const setupDirectories = () => {
  const dataDir = path.join(__dirname, 'data');

  if (!fs.existsSync(dataDir)) {
    logger.info('Creating data directory...');
    fs.mkdirSync(dataDir, { recursive: true });
  }

  return { dataDir };
};

/**
 * Creates sample JSON data files if they don't exist
 */
const createDataFiles = (dataDir: string) => {
  // Users data
  const usersData = [
    {
      username: 'admin_user',
      password: 'admin1234',
      email: 'admin@example.com',
      isActive: true,
      role: 'ADMIN',
    },
    {
      username: 'staff_user1',
      password: 'staff1234',
      email: 'staff1@example.com',
      isActive: true,
      role: 'STAFF',
    },
    {
      username: 'staff_user2',
      password: 'staff1234',
      email: 'staff2@example.com',
      isActive: true,
      role: 'STAFF',
    },
    {
      username: 'client_user1',
      password: 'client1234',
      email: 'client1@example.com',
      isActive: true,
      role: 'CLIENT',
    },
    {
      username: 'client_user2',
      password: 'client1234',
      email: 'client2@example.com',
      isActive: true,
      role: 'CLIENT',
    },
    {
      username: 'supplier_user1',
      password: 'supplier1234',
      email: 'supplier1@example.com',
      isActive: true,
      role: 'SUPPLIER',
    },
    {
      username: 'vendor_user1',
      password: 'vendor1234',
      email: 'vendor1@example.com',
      isActive: true,
      role: 'VENDOR',
    },
  ];

  const companiesData = [
    {
      companyName: 'Tech Solutions Inc',
      companyDescription: 'Leading provider of enterprise software solutions',
      taxId: 'TS12345678',
      industry: 'Technology',
      website: 'https://techsolutions.example.com',
      foundedDate: '2005-06-15',
      managerName: 'John Smith',
    },
    {
      companyName: 'Global Manufacturing Ltd',
      companyDescription:
        'International manufacturing company specializing in industrial equipment',
      taxId: 'GM87654321',
      industry: 'Manufacturing',
      website: 'https://globalmanufacturing.example.com',
      foundedDate: '1998-03-22',
      managerName: 'Sarah Johnson',
    },
    {
      companyName: 'Acme Supplies',
      companyDescription:
        'Wholesale supplier of office and industrial supplies',
      taxId: 'AS45678901',
      industry: 'Wholesale',
      website: 'https://acmesupplies.example.com',
      foundedDate: '2010-11-08',
      managerName: 'Robert Davis',
    },
  ];

  const jobsData = [
    {
      jobCode: 'MGR001',
      jobDescription: 'Warehouse Manager',
      jobChargeHour: 45,
    },
    {
      jobCode: 'INV002',
      jobDescription: 'Inventory Specialist',
      jobChargeHour: 30,
    },
    {
      jobCode: 'LOG003',
      jobDescription: 'Logistics Coordinator',
      jobChargeHour: 32,
    },
  ];

  const staffData = [
    {
      username: 'staff_user1',
      firstName: 'Michael',
      lastName: 'Johnson',
      hireDate: '2020-03-15',
      jobCode: 'MGR001',
    },
    {
      username: 'staff_user2',
      firstName: 'Jennifer',
      lastName: 'Smith',
      hireDate: '2021-07-20',
      jobCode: 'INV002',
    },
  ];

  const warehousesData = [
    {
      warehouseName: 'Main Distribution Center',
      managerUsername: 'staff_user1',
    },
    {
      warehouseName: 'East Coast Fulfillment Center',
      managerUsername: null,
    },
    {
      warehouseName: 'West Coast Storage Facility',
      managerUsername: null,
    },
  ];

  const categoriesData = [
    {
      categoryName: 'Electronics',
      categoryDescription:
        'Consumer and enterprise electronic devices and components',
    },
    {
      categoryName: 'Office Supplies',
      categoryDescription: 'Supplies and equipment for office environments',
    },
    {
      categoryName: 'Furniture',
      categoryDescription: 'Office and home furniture items',
    },
    {
      categoryName: 'Industrial Equipment',
      categoryDescription: 'Heavy machinery and industrial tools',
    },
    {
      categoryName: 'Computer Accessories',
      categoryDescription: 'Peripherals and accessories for computing devices',
    },
  ];

  const productsData = [
    {
      productName: 'Laptop Pro X5',
      warehouseName: 'Main Distribution Center',
      categoryName: 'Electronics',
      clientUsername: 'client_user1',
      initialPrice: 1299.99,
      quantity: 50,
    },
    {
      productName: 'Wireless Mouse M310',
      warehouseName: 'Main Distribution Center',
      categoryName: 'Computer Accessories',
      clientUsername: null,
      initialPrice: 29.99,
      quantity: 200,
    },
    {
      productName: 'Executive Office Chair',
      warehouseName: 'East Coast Fulfillment Center',
      categoryName: 'Furniture',
      clientUsername: 'client_user2',
      initialPrice: 249.99,
      quantity: 25,
    },
  ];

  const profilesData = [
    {
      username: 'admin_user',
      firstName: 'Admin',
      lastName: 'User',
      phone: '555-1234-5678',
      bio: 'System administrator with over 10 years of experience',
      language: 'en',
      timezone: 'America/New_York',
      companyName: 'Tech Solutions Inc',
    },
    {
      username: 'staff_user1',
      firstName: 'Michael',
      lastName: 'Johnson',
      phone: '555-2345-6789',
      language: 'en',
      timezone: 'America/Chicago',
      companyName: 'Tech Solutions Inc',
    },
  ];

  const clientsData = [
    {
      username: 'client_user1',
      creditLimit: 10000.0,
      creditRating: 'A',
      accountStatus: 'active',
      companyName: 'Global Manufacturing Ltd',
    },
    {
      username: 'client_user2',
      creditLimit: 5000.0,
      creditRating: 'B',
      accountStatus: 'active',
      companyName: 'Acme Supplies',
    },
  ];

  const dataFiles = {
    'users.json': usersData,
    'companies.json': companiesData,
    'jobs.json': jobsData,
    'staff.json': staffData,
    'warehouses.json': warehousesData,
    'categories.json': categoriesData,
    'products.json': productsData,
    'profiles.json': profilesData,
    'clients.json': clientsData,
  };

  for (const [filename, data] of Object.entries(dataFiles)) {
    const filePath = path.join(dataDir, filename);

    if (!fs.existsSync(filePath)) {
      logger.info(`Creating data file: ${filename}`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } else {
      logger.info(`Data file already exists: ${filename}`);
    }
  }
};

const setup = () => {
  logger.info('Setting up seed data files...');

  try {
    const { dataDir } = setupDirectories();
    createDataFiles(dataDir);

    logger.success('Setup completed successfully!');
    logger.info('You can now run the seeders with: npm run seed:dev');
  } catch (error) {
    logger.error('Error setting up seed data files');
    logger.error((error as Error).message);
  }
};

setup();
