﻿// <auto-generated />
using System;
using Dispo.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Dispo.Infrastructure.Migrations
{
    [DbContext(typeof(DispoContext))]
    [Migration("20230614000353_PR-69")]
    partial class PR69
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Dispo.Domain.Entities.Account", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(220)
                        .HasColumnType("VARCHAR(220)")
                        .HasColumnName("Email");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("VARCHAR(255)")
                        .HasColumnName("Password");

                    b.HasKey("Id");

                    b.ToTable("Accounts", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Branch", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Cnpj")
                        .IsRequired()
                        .HasMaxLength(18)
                        .HasColumnType("VARCHAR(18)")
                        .HasColumnName("Cnpj");

                    b.Property<long>("LocationId")
                        .HasColumnType("BIGINT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(220)
                        .HasColumnType("VARCHAR(70)")
                        .HasColumnName("Name");

                    b.HasKey("Id");

                    b.HasIndex("LocationId")
                        .IsUnique();

                    b.ToTable("Branches", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Brand", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<byte[]>("Logo")
                        .IsRequired()
                        .HasColumnType("image")
                        .HasColumnName("Logo");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("Name");

                    b.HasKey("Id");

                    b.ToTable("Brands", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Business", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Cnpj")
                        .IsRequired()
                        .HasMaxLength(14)
                        .HasColumnType("VARCHAR(14)")
                        .HasColumnName("Cnpj");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(220)
                        .HasColumnType("VARCHAR(220)")
                        .HasColumnName("Name");

                    b.HasKey("Id");

                    b.ToTable("Businesses", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.BusinessBilling", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("BusinessId")
                        .HasColumnType("BIGINT");

                    b.HasKey("Id");

                    b.HasIndex("BusinessId");

                    b.ToTable("BusinessBillings");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Location", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("City");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("Country");

                    b.Property<string>("District")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("District");

                    b.Property<string>("UF")
                        .IsRequired()
                        .HasMaxLength(3)
                        .HasColumnType("VARCHAR(3)")
                        .HasColumnName("UF");

                    b.HasKey("Id");

                    b.ToTable("Locations", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Movement", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2")
                        .HasColumnName("Date");

                    b.Property<short>("MovementType")
                        .HasMaxLength(120)
                        .HasColumnType("SMALLINT")
                        .HasColumnName("MovementType");

                    b.Property<long>("ProductId")
                        .HasColumnType("BIGINT");

                    b.Property<decimal>("Quantity")
                        .HasMaxLength(120)
                        .HasColumnType("DECIMAL(10, 2)")
                        .HasColumnName("Quantity");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("Movement", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Product", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("BrandId")
                        .HasColumnType("BIGINT");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("Code");

                    b.Property<short>("Color")
                        .HasMaxLength(120)
                        .HasColumnType("SMALLINT")
                        .HasColumnName("Color");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("VARCHAR(500)")
                        .HasColumnName("Description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(220)
                        .HasColumnType("VARCHAR(220)")
                        .HasColumnName("Name");

                    b.Property<short>("Type")
                        .HasMaxLength(120)
                        .HasColumnType("SMALLINT")
                        .HasColumnName("Type");

                    b.Property<short>("UnitOfMeasurement")
                        .HasMaxLength(120)
                        .HasColumnType("SMALLINT")
                        .HasColumnName("UnitOfMeasurement");

                    b.Property<decimal>("UnitPrice")
                        .HasMaxLength(120)
                        .HasColumnType("DECIMAL(10, 2)")
                        .HasColumnName("UnitPrice");

                    b.Property<long>("WarehouseId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.HasIndex("WarehouseId");

                    b.ToTable("Products", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.ProductProvider", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("ProductId")
                        .HasColumnType("BIGINT");

                    b.Property<long>("ProviderId")
                        .HasColumnType("BIGINT");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("ProviderId");

                    b.ToTable("ProductProviders");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.ProductWarehouseQuantity", b =>
                {
                    b.Property<long>("ProductId")
                        .HasColumnType("BIGINT");

                    b.Property<long>("WarehouseId")
                        .HasColumnType("bigint");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("DECIMAL(10, 2)")
                        .HasColumnName("Quantity");

                    b.HasKey("ProductId", "WarehouseId");

                    b.HasIndex("ProductId")
                        .IsUnique();

                    b.HasIndex("WarehouseId")
                        .IsUnique();

                    b.HasIndex("ProductId", "WarehouseId")
                        .IsUnique();

                    b.ToTable("ProductWarehouseQuantities");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Provider", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Cnpj")
                        .IsRequired()
                        .HasMaxLength(18)
                        .HasColumnType("VARCHAR(18)")
                        .HasColumnName("CPNJ");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("Name");

                    b.HasKey("Id");

                    b.ToTable("Providers", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("AccountId")
                        .HasColumnType("BIGINT");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("BirthDate");

                    b.Property<long>("BranchId")
                        .HasColumnType("BIGINT");

                    b.Property<string>("CpfCnpj")
                        .IsRequired()
                        .HasMaxLength(18)
                        .HasColumnType("VARCHAR(18)")
                        .HasColumnName("CpfCnpj");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("VARCHAR(60)")
                        .HasColumnName("FirstName");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("VARCHAR(60)")
                        .HasColumnName("LastName");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasMaxLength(16)
                        .HasColumnType("VARCHAR(16)")
                        .HasColumnName("Phone");

                    b.HasKey("Id");

                    b.HasIndex("AccountId")
                        .IsUnique();

                    b.HasIndex("BranchId");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.UserBusiness", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("BusinessId")
                        .HasColumnType("BIGINT");

                    b.Property<long>("PersonId")
                        .HasColumnType("BIGINT");

                    b.HasKey("Id");

                    b.HasIndex("BusinessId");

                    b.HasIndex("PersonId");

                    b.ToTable("UserBusinesses");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.UserMovement", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("BIGINT");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("MovementId")
                        .HasColumnType("BIGINT");

                    b.Property<long?>("UserId")
                        .HasColumnType("BIGINT");

                    b.HasKey("Id");

                    b.HasIndex("MovementId");

                    b.HasIndex("UserId");

                    b.ToTable("UserMovements");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Warehouse", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("BranchId")
                        .HasColumnType("BIGINT");

                    b.HasKey("Id");

                    b.HasIndex("BranchId")
                        .IsUnique();

                    b.ToTable("Warehouses", (string)null);
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Branch", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Location", "Location")
                        .WithOne("Branch")
                        .HasForeignKey("Dispo.Domain.Entities.Branch", "LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.BusinessBilling", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Business", "Business")
                        .WithMany()
                        .HasForeignKey("BusinessId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Business");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Movement", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Product", "Product")
                        .WithMany("Movements")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Product", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Brand", "Brand")
                        .WithMany("Products")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Dispo.Domain.Entities.Warehouse", "Warehouse")
                        .WithMany("Products")
                        .HasForeignKey("WarehouseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");

                    b.Navigation("Warehouse");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.ProductProvider", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Product", "Product")
                        .WithMany("ProductProviders")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Dispo.Domain.Entities.Provider", "Provider")
                        .WithMany("ProductProviders")
                        .HasForeignKey("ProviderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("Provider");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.ProductWarehouseQuantity", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Product", "Product")
                        .WithOne("ProductWarehouseQuantity")
                        .HasForeignKey("Dispo.Domain.Entities.ProductWarehouseQuantity", "ProductId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Dispo.Domain.Entities.Warehouse", "Warehouse")
                        .WithOne("ProductWarehouseQuantity")
                        .HasForeignKey("Dispo.Domain.Entities.ProductWarehouseQuantity", "WarehouseId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("Warehouse");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.User", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Account", "Account")
                        .WithOne("User")
                        .HasForeignKey("Dispo.Domain.Entities.User", "AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Dispo.Domain.Entities.Branch", "Branch")
                        .WithMany("Employees")
                        .HasForeignKey("BranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Branch");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.UserBusiness", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Business", "Business")
                        .WithMany("PersonBusinesses")
                        .HasForeignKey("BusinessId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Dispo.Domain.Entities.User", "Person")
                        .WithMany("UserBusinesses")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Business");

                    b.Navigation("Person");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.UserMovement", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Movement", "Movement")
                        .WithMany("UserMovements")
                        .HasForeignKey("MovementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Dispo.Domain.Entities.User", "User")
                        .WithMany("UserMovements")
                        .HasForeignKey("UserId");

                    b.Navigation("Movement");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Warehouse", b =>
                {
                    b.HasOne("Dispo.Domain.Entities.Branch", "Branch")
                        .WithOne("Warehouse")
                        .HasForeignKey("Dispo.Domain.Entities.Warehouse", "BranchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branch");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Account", b =>
                {
                    b.Navigation("User")
                        .IsRequired();
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Branch", b =>
                {
                    b.Navigation("Employees");

                    b.Navigation("Warehouse")
                        .IsRequired();
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Brand", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Business", b =>
                {
                    b.Navigation("PersonBusinesses");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Location", b =>
                {
                    b.Navigation("Branch");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Movement", b =>
                {
                    b.Navigation("UserMovements");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Product", b =>
                {
                    b.Navigation("Movements");

                    b.Navigation("ProductProviders");

                    b.Navigation("ProductWarehouseQuantity")
                        .IsRequired();
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Provider", b =>
                {
                    b.Navigation("ProductProviders");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.User", b =>
                {
                    b.Navigation("UserBusinesses");

                    b.Navigation("UserMovements");
                });

            modelBuilder.Entity("Dispo.Domain.Entities.Warehouse", b =>
                {
                    b.Navigation("ProductWarehouseQuantity")
                        .IsRequired();

                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}