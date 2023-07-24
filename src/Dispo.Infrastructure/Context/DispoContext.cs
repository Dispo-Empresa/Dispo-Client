using Dispo.Domain;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Dispo.Infrastructure.Context
{
    public class DispoContext : DbContext
    {
        public DispoContext(DbContextOptions<DispoContext> options)
            : base(options)
        { }

        public DispoContext()
        { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Address> Adresses { get; set; }
        public DbSet<Batch> Batches { get; set; }
        public DbSet<BatchMovement> BatchMovements { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Movement> Movements { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<ProductDimension> ProductDimensions { get; set; }
        public DbSet<ProductManufacturer> ProductManufacturers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<PurchaseOrderAttachment> PurchaseOrderAttachments { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Shipping> Shippings { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AccountMapping());
            modelBuilder.ApplyConfiguration(new AdressMapping());
            modelBuilder.ApplyConfiguration(new BatchMapping());
            modelBuilder.ApplyConfiguration(new BatchMovementMapping());
            modelBuilder.ApplyConfiguration(new CompanyMapping());
            modelBuilder.ApplyConfiguration(new ManufacturerMapping());
            modelBuilder.ApplyConfiguration(new MovementMapping());
            modelBuilder.ApplyConfiguration(new OrderMapping());
            modelBuilder.ApplyConfiguration(new ProductDimensionMapping());
            modelBuilder.ApplyConfiguration(new ProductManufacturerMapping());
            modelBuilder.ApplyConfiguration(new ProductMapping());
            modelBuilder.ApplyConfiguration(new PurchaseOrderAttachmentMapping());
            modelBuilder.ApplyConfiguration(new PurchaseOrderMapping());
            modelBuilder.ApplyConfiguration(new RoleMapping());
            modelBuilder.ApplyConfiguration(new ShippingMapping());
            modelBuilder.ApplyConfiguration(new SupplierMapping());
            modelBuilder.ApplyConfiguration(new UserMapping());
            modelBuilder.ApplyConfiguration(new WarehouseMapping());

            CreateRoles(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private void CreateRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(new Role() { Id = 5, Name = "Gerente", Key = Domain.Roles.Manager }, 
                                                new Role() { Id = 6, Name = "Gerente de compras", Key = Domain.Roles.PurchasingManager }, 
                                                new Role() { Id = 7, Name = "Operador de depósito", Key = Domain.Roles.WarehouseOperator });
        }
    }
}