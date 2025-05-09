# Wareflow Server Documentation

## Overview

This document provides a comprehensive guide to the server architecture of the Wareflow application. The server is built using a modular architecture with Express.js and TypeScript, following best practices for separation of concerns, code organization, and maintainability.

## Project Structure

The server codebase is organized as follows:

```
server/
├── src/
│   ├── app.ts               # Express app configuration
│   ├── config.ts            # Express app configuration
│   ├── prisma/              # Prisma ORM config
│   ├── server.ts            # Server entry point
│   ├── config/              # Configuration files
│   ├── db/                  # Database related files
│   │   └── seeders/         # Database seeders
│   ├── middlewares/         # Middleware functions
│   ├── modules/             # Feature modules
│   │   ├── auth/            # Authentication module
│   │   │   ├── controllers/ # Request handlers
│   │   │   ├── dtos/        # Data Transfer Objects
│   │   │   ├── routes/      # Route definitions
│   │   │   ├── schemas/     # Validation schemas
│   │   │   ├── services/    # Business logic
│   │   │   ├── utils/       # Helper functions
│   │   │   └── auth.doc.md  # Module documentation
│   │   └── [other-modules]/
│   └── utils/               # Global utility functions
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v20.x or newer)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
6. Seed the database:
   ```bash
   npm run seed
   ```
7. Start the development server:
   ```bash
   npm run dev
   ```

## Database

### Prisma ORM

The application uses Prisma as an ORM for database operations. The Prisma schema is defined in `prisma/schema.prisma`.

### Database Seeders

Database seeders are located in the `db/seeder` directory. They are organized in a modular and comprehensive way, making them easy to understand and maintain.

To run all seeders:

```bash
npm run seed
```

## Modular Architecture

The server follows a modular architecture where each feature of the application is encapsulated in its own module. This approach promotes separation of concerns and makes the codebase more maintainable and scalable.

### Module Structure

Each module is structured as follows:

- **controllers/**: Handle HTTP requests and responses
- **dtos/**: Define data structures for input/output
- **routes/**: Define API endpoints
- **schemas/**: Define validation rules
- **services/**: Implement business logic
- **utils/**: Provide helper functions
- **[module-name].doc.md**: Documentation specific to the module



### DTOs vs Schemas

- **DTOs (Data Transfer Objects)**: Define the structure of data (types only)
- **Schemas**: Handle validation logic (format, patterns, requirements)

For more details, see the [Authentication Module Documentation](modules/auth/auth.doc.md).

## Middleware

The application uses several middleware functions located in the `middlewares/` directory:

### Authentication Middleware

```typescript
// middlewares/auth.middleware.ts
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Verifies JWT token and attaches user to request
};
```

### Role Verification Middleware

```typescript
// middlewares/role-verifier.middleware.ts
export const verifyRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Verifies user has required role(s)
  };
};
```

### Schema Validation Middleware

```typescript
// middlewares/schema-validator.middleware.ts
export const validateSchema = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Validates request body against Zod schema
  };
};
```

## Error Handling

The application implements a centralized error handling approach:

- Controller methods catch and handle specific errors
- HTTP status codes are set based on error types
- Error messages are standardized for consistency

Example:

```typescript
try {
  // Business logic
} catch (error) {
  if (error instanceof Error && error.message.includes('already')) {
    res.status(409).json({ message: error.message });
    return;
  }
  res.status(500).json({ message: 'Internal server error' });
}
```

## Development Guidelines

### Adding a New Module

1. Create a folder in the `modules/` directory with the module name
2. Create the following subdirectories:
   - controllers/
   - dtos/
   - routes/
   - schemas/
   - services/
   - utils/
3. Create a `[module-name].doc.md` file for documentation
4. Export routes from the routes folder
5. Import and use the routes in `routes/index.ts`

### Code Style

- Use TypeScript interfaces for type definitions
- Use Zod schemas for validation
- Follow the established pattern for controllers, services, and routes
- Write comprehensive error handling
- Document all modules

### DTO and Schema Design

- **DTOs**: Define only the structure (types) of data
- **Schemas**: Define validation rules with Zod

Example:

```typescript
// DTO
export interface CreateUserDto {
  username: string;
  email?: string;
  password: string;
}

// Schema
export const CreateUserSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email().optional(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/)
});
```

## Conclusion

The Wareflow server architecture is designed with modularity, maintainability, and scalability in mind. By following the patterns established in this documentation, you can contribute to the project while maintaining consistency across the codebase.

For module-specific details, refer to the documentation file within each module directory.