using EmailSender.API.Services;
using EmailSender.API.Services.Interfaces;

namespace EmailSender.API.Ioc
{
    public class Injector
    {
        public static void InjectIocServices(IServiceCollection service)
        {
            service.AddTransient<IEmailSenderService, EmailSenderService>();
            service.AddTransient<ICodeGeneratorService, CodeGeneratorService>();
        }
    }
}