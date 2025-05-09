# Database Seeders for Prisma

This project contains database seeders for a Prisma schema with various entities including users, companies, warehouses, products, etc.

## Project Structure

```
- prisma/
  - schema.prisma  (your Prisma schema file)
- src/
  - seeders/
    - index.ts     (main seeder entry point)
    - utils/       (utility functions)
    - data/        (JSON seed data files)
    - services/    (individual entity seeders)
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Ensure your `.env` file contains the `DATABASE_URL` environment variable:

```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

3. Make sure your database is created and Prisma schema is deployed:

```bash
npx prisma db push
```

## Running the Seeders

### Development

```bash
npm run seed
```

This command will run the seeders using ts-node for quick development.

### Production

```bash
npm run seed:prod
```

This command will compile the TypeScript files and then run the seeders.

## Modifying Seed Data

You can modify the seed data by editing the JSON files in `src/seeders/data/`:

- `users.json` - User accounts with roles
- `companies.json` - Company data
- `jobs.json` - Job positions and details
- `staff.json` - Staff member information
- `warehouses.json` - Warehouse locations
- `categories.json` - Product categories
- `products.json` - Product information
- `profiles.json` - User profiles
- `clients.json` - Client account details

## Adding New Seed Types

To add a new type of seed data:

1. Create a new JSON file in `src/seeders/data/`
2. Create a new seeder service in `src/seeders/services/`
3. Import and call the new seeder in `src/seeders/index.ts`

## Dependencies

- Prisma Client
- bcrypt (for password hashing)
- chalk (for colorful logging)
- TypeScript & ts-node for development