namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class TokenResponseDto
    {
        public string Token { get; set; }
        public decimal TokenExpirationTime { get; set; }
        public long UserId { get; set; }
    }
}