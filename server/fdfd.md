erDiagram
    User ||--o| Profile : has
    User ||--o| Staff : "is a"
    User ||--o| Client : "is a"
    User ||--o| Supplier : "is a"
    User ||--o| Vendor : "is a"
    
    Profile ||--o| Address : has
    Profile }o--|| Company : "belongs to"
    
    Job ||--|{ Staff : employs
    Staff |o--o| Warehouse : manages
    
    Warehouse ||--|{ Product : stores
    Category ||--|{ Product : categorizes
    Client |o--|{ Product : owns
    Company ||--|{ Client : has
    Company ||--|{ Supplier : has
    Company ||--|{ Profile : has
    
    Supplier ||--|{ Vendor : has
    Supplier ||--|{ SupplierOrder : places
    
    Client ||--|{ ClientOrder : places
    Vendor |o--|{ ClientOrder : manages
    Vendor |o--|{ SupplierOrder : manages
    
    ClientOrder ||--|{ ClientOrderItem : contains
    SupplierOrder ||--|{ SupplierOrderItem : contains
    
    Product ||--|{ ClientOrderItem : "is part of"
    Product ||--|{ SupplierOrderItem : "is part of"
    Product ||--|{ ProductPriceHistory : has
    Product ||--|{ InventoryTransaction : has
    
    Warehouse ||--|{ InventoryTransaction : "takes place in"
    Staff ||--|{ InventoryTransaction : performs
    
    User {
        string userId PK
        string username UK
        string passwordHash
        string email UK
        boolean isActive
        datetime lastLogin
        enum UserRole role
        datetime createdAt
    }
    
    Profile {
        string profileId PK
        string userId FK,UK
        string firstName
        string lastName
        string phone
        string bio
        string avatarUrl
        string language
        string timezone
        string companyId FK
        datetime createdAt
    }
    
    Staff {
        string staffId PK
        string jobCode FK
        string firstName
        string lastName
        datetime hireDate
        string userId FK,UK
        datetime createdAt
    }
    
    Client {
        string clientId PK
        string userId FK,UK
        float creditLimit
        string creditRating
        string accountStatus
        string companyId FK
        datetime createdAt
    }
    
    Supplier {
        string supplierId PK
        string companyId FK
        string userId FK,UK
        datetime createdAt
    }
    
    Vendor {
        string vendorId PK
        string userId FK,UK
        string supplierId FK
        string position
        datetime createdAt
    }
    
    Address {
        string addressId PK
        string profileId FK,UK
        string streetAddress
        string city
        string state
        string postalCode
        string country
    }
    
    Job {
        string jobCode PK
        string jobDescription
        int jobChargeHour
    }
    
    Warehouse {
        string warehouseId PK
        string warehouseName
        string managerId FK,UK
    }
    
    Product {
        string productId PK
        string productName
        string warehouseId FK
        string categoryId FK
        string clientId FK
        int quantity
    }
    
    Category {
        string categoryId PK
        string categoryName
        string categoryDescription
    }
    
    Company {
        string companyId PK
        string companyName
        string companyDescription
        string taxId UK
        string industry
        string website
        datetime foundedDate
        string managerName
    }
    
    ClientOrder {
        string clientOrderId PK
        string clientId FK
        string vendorId FK
        string status
        datetime orderDate
        datetime createdAt
    }
    
    ClientOrderItem {
        string itemId PK
        string clientOrderId FK
        string productId FK
        int quantity
        datetime createdAt
    }
    
    SupplierOrder {
        string supplierOrderId PK
        string supplierId FK
        string vendorId FK
        string status
        datetime orderDate
        datetime createdAt
    }
    
    SupplierOrderItem {
        string itemId PK
        string supplierOrderId FK
        string productId FK
        int quantity
        datetime createdAt
    }
    
    ProductPriceHistory {
        string historyId PK
        string productId FK
        float price
        datetime effectiveDate
        datetime createdAt
    }
    
    InventoryTransaction {
        string transactionId PK
        string productId FK
        string warehouseId FK
        string staffId FK
        string transactionType
        int quantity
        datetime transactionDate
        datetime createdAt
    }