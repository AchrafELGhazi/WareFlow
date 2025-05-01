# 🏢 Warehouse Management System (WMS)

[![GitHub Actions](https://img.shields.io/github/workflow/status/your-username/wareflow/CI)](https://github.com/your-username/wareflow/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)](https://www.postgresql.org/)

## 📦 Overview

The Warehouse Management System (WMS) is a modern full-stack application designed to revolutionize warehouse operations for businesses of all sizes. By leveraging a robust tech stack of React, Express.js, and PostgreSQL, WMS enables companies to track products in real-time, manage inventory with precision, and automate critical workflows.

![WMS Dashboard Preview](https://via.placeholder.com/800x400?text=WMS+Dashboard+Preview)

### Why Choose WMS?

- **Real-time visibility** into warehouse operations
- **Reduced manual errors** through automation
- **Enhanced operational efficiency** with intuitive workflows
- **Data-driven decision making** through comprehensive reporting
- **Scalable architecture** to grow with your business

## ✨ Features

### Core Functionality

- **📊 Real-time Product Tracking**
  - Monitor products at every stage (receiving, storage, picking, shipping)
  - Barcode/QR code integration for accurate tracking
  - Location mapping within warehouse facilities

- **📦 Inventory Management**
  - Automated stock level monitoring and alerts
  - Batch and expiry date tracking
  - Inventory forecasting and optimization

- **👤 User Management**
  - Role-based access control (Admin, Manager, Operator, Client)
  - Secure JWT authentication
  - Activity logging and audit trails

- **🔔 Smart Notifications**
  - Customizable alerts for stock levels, shipments, and deadlines
  - Multi-channel delivery (in-app, email, SMS)
  - Escalation workflows for critical events

- **📈 Reporting & Analytics**
  - Customizable dashboards with key metrics
  - Exportable reports (PDF, CSV, Excel)
  - Historical data analysis and trends

### Technical Features

- **🏗️ Modular Architecture**
  - Clean separation of concerns
  - Reusable components and services
  - Comprehensive API documentation

- **🔄 CI/CD Integration**
  - Automated testing on every commit
  - Code quality checks with ESLint and Prettier
  - Streamlined deployment process

- **🐳 Containerization**
  - Docker Compose for local development
  - Production-ready container configuration
  - Easy scaling and deployment

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+)
- npm or yarn
- Docker and Docker Compose (recommended)
- PostgreSQL (if not using Docker)

### Quick Start with Docker

The fastest way to get WMS up and running:

```bash
# Clone the repository
git clone https://github.com/your-username/wareflow.git
cd wareflow

# Create and configure environment variables
cp .env.example .env
# Edit .env with your settings

# Start the application
docker-compose up
```

Navigate to `http://localhost:3000` to access the application.

### Manual Installation

#### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database settings

# Run database migrations
npx prisma migrate dev

# Start server
npm run dev
```

#### Frontend Setup

```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start development server
npm start
```

## 📝 API Documentation

Our API follows RESTful principles and is fully documented. Once the server is running, you can access the API documentation at:

```
http://localhost:4000/api-docs
```

## 🔄 Continuous Integration

This project uses GitHub Actions for CI/CD. Every pull request triggers:

- Code linting
- Unit and integration tests
- Build verification

## 📊 Database Schema

WMS uses a PostgreSQL database with the following core entities:

- **Products**: Item details, categories, and attributes
- **Inventory**: Stock levels, locations, and movements
- **Orders**: Customer orders and fulfillment status
- **Users**: System users and their roles
- **Warehouses**: Physical locations and zones

## 🤝 Contributing

We welcome contributions to improve WMS! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code adheres to our coding standards and includes appropriate tests.

## 👥 Meet the Team

- **[Achraf El Ghazi](https://github.com/achrafelghazi)**
- **[Ikram Ghala](https://github.com/ikram062)**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions, issues, or feature requests, please use the GitHub Issues or contact me at a.elghazi@aui.ma
---

<p align="left">
  Built with ❤️ (and for a class project) by the WMS Team
</p>
