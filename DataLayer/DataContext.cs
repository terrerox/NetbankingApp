using System;
using EntitiesLayer.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DataLayer
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(
                Configuration.GetConnectionString("WebApiDatabase"),
                b => b.MigrationsAssembly("RouterLayer")
            );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<Product>()
            //     .HasOptional(p => p.KnownProductCode)
            //     .WithMany()
            //     .HasForeignKey(p => p.ProductCode);
            // modelBuilder.Entity<User>()
            //     .HasOne(p => p.Client)
            //     .WithOne(i => i.User)
            //     .HasForeignKey<Client>(b => b.UserId);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<AccountActivity> AccountActivities { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<CardPayment> CardPayments { get; set; }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<Fee> Fees { get; set; }
    }
}