namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class TokenInfoDto
    {
        public string Token { get; set; }
        public DateTime? TokenExpirationTime { get; set; }
    }
}