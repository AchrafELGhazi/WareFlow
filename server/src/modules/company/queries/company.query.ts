import { PrismaClient } from "@prisma/client";
class CompanyQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllCompaniesQuery = async () => {
    const companies = await this.prisma.company.findMany({
      select: {
        companyId: true,
        companyName: true,
        companyDescription: true,
        taxId: true,
        industry: true,
        website: true,
        foundedDate: true,
        managerName: true,
        suppliers: {
          include: {
            user: true,
            vendors: true,
            supplierOrders: {
              include: {
                orderItems: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
        clients: {
          include: {
            user: true,
            products: true,
            clientOrders: {
              include: {
                orderItems: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
        profiles: {
          include: {
            address: true,
            user: true,
          },
        },
      },
    });

    // Transform the data to match the expected CompanyWithRelationsResult format
    return companies.map(company => ({
      company_id: company.companyId,
      company_name: company.companyName,
      company_description: company.companyDescription,
      tax_id: company.taxId,
      industry: company.industry,
      website: company.website,
      founded_date: company.foundedDate
        ? company.foundedDate.toISOString()
        : null,
      manager_name: company.managerName,
      suppliers: company.suppliers.map(supplier => ({
        supplierId: supplier.supplierId,
        user: {
          userId: supplier.user.userId,
          username: supplier.user.username,
          email: supplier.user.email,
          isActive: supplier.user.isActive,
          role: supplier.user.role,
        },
        vendors: supplier.vendors.map(vendor => ({
          vendorId: vendor.vendorId,
          position: vendor.position,
        })),
        supplierOrders: supplier.supplierOrders.map(order => ({
          supplierOrderId: order.supplierOrderId,
          status: order.status,
          orderDate: order.orderDate,
          orderItems: order.orderItems.map(item => ({
            itemId: item.itemId,
            quantity: item.quantity,
            product: {
              productId: item.product.productId,
              productName: item.product.productName,
            },
          })),
        })),
      })),
      clients: company.clients.map(client => ({
        clientId: client.clientId,
        creditLimit: client.creditLimit,
        creditRating: client.creditRating,
        accountStatus: client.accountStatus,
        user: {
          userId: client.user.userId,
          username: client.user.username,
          email: client.user.email,
          isActive: client.user.isActive,
          role: client.user.role,
        },
        products: client.products.map(product => ({
          productId: product.productId,
          productName: product.productName,
        })),
        clientOrders: client.clientOrders.map(order => ({
          clientOrderId: order.clientOrderId,
          status: order.status,
          orderDate: order.orderDate,
          orderItems: order.orderItems.map(item => ({
            itemId: item.itemId,
            quantity: item.quantity,
            product: {
              productId: item.product.productId,
              productName: item.product.productName,
            },
          })),
        })),
      })),
      profiles: company.profiles.map(profile => ({
        profileId: profile.profileId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        address: profile.address
          ? {
              addressId: profile.address.addressId,
              streetAddress: profile.address.streetAddress,
              city: profile.address.city,
              state: profile.address.state,
              postalCode: profile.address.postalCode,
              country: profile.address.country,
            }
          : null,
        user: {
          userId: profile.user.userId,
          username: profile.user.username,
          email: profile.user.email,
          role: profile.user.role,
        },
      })),
    }));
  };

  getCompanyInfoQuery = (companyId: string) => {
    return this.prisma.$queryRaw`
        SELECT *
        FROM companies c
        WHERE company_id = ${companyId}
      `;
  };

  createCompanyQuery = (
    companyName: string,
    companyDescription: string,
    taxId: string,
    industry: string,
    website: string,
    foundedDate: string,
    managerName: string
  ) => {
    console.log('Query values:', {
      companyName,
      companyDescription,
      taxId,
      industry,
      website,
      foundedDate,
      managerName,
    });
    return this.prisma.$queryRaw`
      INSERT INTO companies (company_id, company_name, company_description, tax_id, industry, website, founded_date, manager_name)
      VALUES (gen_random_uuid(), ${companyName}, ${companyDescription}, ${taxId}, ${industry}, ${website}, ${foundedDate}::timestamp, ${managerName})
      RETURNING *;
    `;
  };

  updateCompanyQuery = (
    companyId: string,
    companyName: string,
    companyDescription: string,
    taxId: string,
    industry: string,
    website: string,
    foundedDate: string,
    managerName: string
  ) => {
    return this.prisma.$queryRaw`
      UPDATE companies
      SET 
        company_name = ${companyName},
        company_description = ${companyDescription},
        tax_id = ${taxId},
        industry = ${industry},
        website = ${website},
        founded_date = ${foundedDate}::timestamp,
        manager_name = ${managerName}
        WHERE company_id = ${companyId}
    `;
  };

  async deleteCompanyQuery(companyId: string) {
    return this.prisma.$queryRaw`
    DELETE FROM companies 
    WHERE company_id = ${companyId}
    `;
  }
}

export default new CompanyQueries();
