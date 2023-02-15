using EmailSender.API.DTOs.RequestDTO;

namespace EmailSender.API.Services.Interfaces
{
    public interface IEmailSenderService
    {
        Task SendEmailAsync(EmailSenderRequestDto request);
    }
}