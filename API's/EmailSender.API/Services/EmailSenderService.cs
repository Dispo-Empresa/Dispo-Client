using EmailSender.API.DTOs.RequestDTO;
using EmailSender.API.Enums;
using EmailSender.API.Exceptions;
using EmailSender.API.Services.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
using System.Text;

namespace EmailSender.API.Services
{
    public class EmailSenderService : IEmailSenderService
    {
        private readonly IConfiguration _config;

        public EmailSenderService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(EmailSenderRequestDto request)
        {
            try
            {
                var emailMessage = BuildEmailMessageWithCode(request);
                await SendEmailAsyncBySmtpClient(emailMessage, request);
            }
            catch (EmailSenderException emailSenderEx)
            {
                throw new EmailSenderException(emailSenderEx.Message);
            }
            catch (Exception ex)
            {
                throw new EmailSenderException(ex.Message);
            }
        }

        private MimeMessage BuildEmailMessageWithCode(EmailSenderRequestDto request)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(request.EmailFrom));
                email.To.Add(MailboxAddress.Parse(request.EmailTo));
                email.Subject = request.Subject;
                email.Body = new TextPart(TextFormat.Html) { Text = HtmlEmailBuilder(request.EmailTo, request.RecoveryToken) };

                return email;
            }
            catch (EmailSenderException ex)
            {
                throw new EmailSenderException(eEventType.Building, ex.Message);
            }
        }

        private async Task SendEmailAsyncBySmtpClient(MimeMessage emailMessage, EmailSenderRequestDto request)
        {
            try
            {
                using (var smtp = new SmtpClient())
                {
                    await smtp.ConnectAsync(_config["SmtpConfig:Host"], int.Parse(_config["SmtpConfig:Port"]), bool.Parse(_config["SmtpConfig:UseSsl"]));
                    await smtp.AuthenticateAsync(request.AuthenticateInfo.EmailAuth, request.AuthenticateInfo.PasswordAuth);
                    await smtp.SendAsync(emailMessage);
                    await smtp.DisconnectAsync(true);
                }
            }
            catch (EmailSenderException ex)
            {
                throw new EmailSenderException(eEventType.Sending, ex.Message);
            }
        }

        private string HtmlEmailBuilder(string email, string generateCode)
        {
            return new StringBuilder()
                .Append($"<h2>Olá {email},</h2><br>")
                .AppendLine("<p>Esqueceu sua senha? Sem problemas, vamos redefinir <img src=\"https://html-online.com/editor/tiny4_9_11/plugins/emoticons/img/smiley-wink.gif\" alt=\"wink\" /></p>")
                .AppendLine($"<p><strong>Segue código para redefinição da sua senha:</strong> <strong><span style=\"color: #ff0000;\">{generateCode}</span></strong></p><br>")
                .AppendLine("<p><span style=\"background - color: #999999;\">Caso a redefinição de senha não tenha sido solicitada, desconsidere este email!</span></p>")
                .AppendLine("<p><span style=\"background - color: #999999;\">Email gerado automáticamente, por favor, não responda.</span></p>").ToString();
        }
    }
}