/* to use these types
          import { User, Product, ClientOrder, CreateUserInput } from './types';

          
          or import specific types---->     import { UserRole, OrderStatus } from './types';
*/
export * from './user-profile.types';

export * from './client-business.types';

export * from './product-warehouse.types';

export * from './order.types';

export type TransactionType = 'receive' | 'ship' | 'adjust' | 'transfer';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type AccountStatus = 'active' | 'inactive' | 'suspended';
