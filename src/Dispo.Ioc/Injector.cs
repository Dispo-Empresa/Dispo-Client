using Dispo.APIs.Queues.Publishers;
using Dispo.Domain.Queues.Publishers.Interfaces;
using Dispo.Infrastructure.Repositories;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Cache;
using Dispo.Service.Cache.Interfaces;
using Dispo.Service.Services;
using Dispo.Service.Services.Interfaces;
using Dispo.Service.Services.PasswordRecovery;
using Dispo.Service.Services.PasswordRecovery.Interfaces;
using Dispo.Service.Token;
using Dispo.Service.Token.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Dispo.IoC
{
    public class Injector
    {
        public static void InjectIoCServices(IServiceCollection serviceColletion)
        {
            InjectRepositories(serviceColletion);
            InjectServices(serviceColletion);
            InjectGenerics(serviceColletion);
        }

        private static void InjectRepositories(IServiceCollection serviceColletion)
        {
            serviceColletion.AddScoped<IAccountRepository, AccountRepository>();
            serviceColletion.AddScoped<IMovementRepository, MovementRepository>();
            serviceColletion.AddScoped<IProductRepository, ProductRepository>();
            serviceColletion.AddScoped<IUserRepository, UserRepository>();
            serviceColletion.AddScoped<IWarehouseAccountRepository, WarehouseAccountRepository>();
            serviceColletion.AddScoped<IRoleRepository, RoleRepository>();
            serviceColletion.AddScoped<IManufacturerRepository, ManufacturerRepository>();
            serviceColletion.AddScoped<ISupplierRepository, SupplierRepository>();
            serviceColletion.AddScoped<IWarehouseRepository, WarehouseRepository>();
            serviceColletion.AddScoped<IAddressRepository, AddressRepository>();
            serviceColletion.AddScoped<IPurchaseOrderAttachmentRepository, PurchaseOrderAttachmentRepository>();
        }

        private static void InjectServices(IServiceCollection serviceColletion)
        {
            serviceColletion.AddScoped<IAccountService, AccountService>();
            serviceColletion.AddScoped<IMovementService, MovementService>();
            serviceColletion.AddScoped<IProductService, ProductService>();
            serviceColletion.AddScoped<IUserService, UserService>();
            serviceColletion.AddScoped<IUserAccountService, UserAccountService>();
            serviceColletion.AddScoped<IPasswordRecoveryService, PasswordRecoveryService>();
            serviceColletion.AddScoped<ITokenGeneratorService, TokenGeneratorService>();
            serviceColletion.AddScoped<IAccountResolverService, AccountResolverService>();
            serviceColletion.AddScoped<IAdmService, AdmService>();
            serviceColletion.AddScoped<IManufacturerService, ManufacturerService>();
            serviceColletion.AddScoped<ISupplierService, SupplierService>();
            serviceColletion.AddScoped<IAddressService, AddressService>();
            serviceColletion.AddScoped<IWarehouseService, WarehouseService>();
        }

        private static void InjectGenerics(IServiceCollection serviceColletion)
        {
            serviceColletion.AddScoped<ITokenGenerator, TokenGenerator>();
            serviceColletion.AddScoped<ICacheManager, CacheManager>();
            serviceColletion.AddScoped<IEmailSenderPublisher, EmailSenderPublisher>();
            serviceColletion.AddSingleton(MappingProfile.CreateMappingProfile().CreateMapper());
            serviceColletion.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            serviceColletion.AddMemoryCache();
        }
    }
}