namespace EmailSender.API.DTOs.RequestDTO
{
    public class EmailSenderRequestDto
    {
        public string Subject { get; set; }
        public string EmailFrom { get; set; }
        public string EmailTo { get; set; }
        public string RecoveryToken { get; set; }
        public EmailCodeConfigDto CodeConfig { get; set; }
        public EmailAuthenticateInfoDto AuthenticateInfo { get; set; }
    }
}