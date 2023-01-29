namespace EmailSender.API.DTOs
{
    public class EmailCodeConfigDto
    {
        public int NumberDigits { get; set; }
        public decimal ExpirationTime { get; set; }
    }
}