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
using Microsoft.Extensions.DependencyInjection;

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
            serviceColletion.AddScoped<IProductWarehouseQuantityRepository, ProductWarehouseQuantityRepository>();
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
            serviceColletion.AddScoped<IProductWarehouseQuantityService, ProductWarehouseQuantityService>();
        }

        private static void InjectGenerics(IServiceCollection serviceColletion)
        {
            serviceColletion.AddScoped<ITokenGenerator, TokenGenerator>();
            serviceColletion.AddScoped<ICacheManager, CacheManager>();
            serviceColletion.AddScoped<IEmailSenderPublisher, EmailSenderPublisher>();
            serviceColletion.AddSingleton(MappingProfile.CreateMappingProfile().CreateMapper());
        }
    }
}