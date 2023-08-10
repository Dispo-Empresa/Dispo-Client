namespace Dispo.Domain.DTOs.Response
{
    public class TokenInfoDto
    {
        public string Token { get; set; }
        public DateTime? TokenExpirationTime { get; set; }
    }
}