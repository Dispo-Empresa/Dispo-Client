﻿using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey("Id");

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.Property(x => x.FirstName)
                   .IsRequired()
                   .HasColumnName("FirstName")
                   .HasColumnType("VARCHAR(60)")
                   .HasMaxLength(60);

            builder.Property(x => x.LastName)
                   .IsRequired()
                   .HasColumnName("LastName")
                   .HasColumnType("VARCHAR(60)")
                   .HasMaxLength(60);

            builder.Property(x => x.Cpf)
                   .IsRequired()
                   .HasColumnName("Cpf")
                   .HasColumnType("VARCHAR(18)")
                   .HasMaxLength(18);

            builder.Property(x => x.Phone)
                   .IsRequired()
                   .HasColumnName("Phone")
                   .HasColumnType("VARCHAR(16)")
                   .HasMaxLength(16);

            builder.Property(x => x.BirthDate)
                   .HasColumnName("BirthDate")
                   .HasColumnType("datetime2");

            builder.HasOne(a => a.Account)
                   .WithOne(b => b.User)
                   .HasForeignKey<Account>(c => c.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(a => a.Company)
                   .WithMany(b => b.Users)
                   .HasForeignKey(c => c.CompanyId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(a => a.Adress)
                   .WithOne(b => b.User)
                   .HasForeignKey<User>(c => c.AdressId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}