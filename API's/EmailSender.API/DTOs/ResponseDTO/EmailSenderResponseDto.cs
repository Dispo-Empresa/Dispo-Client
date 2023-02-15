namespace EmailSender.API.DTOs.ResponseDTO
{
    public class EmailSenderResponseDto
    {
        public bool Success { get; set; } = false;
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}