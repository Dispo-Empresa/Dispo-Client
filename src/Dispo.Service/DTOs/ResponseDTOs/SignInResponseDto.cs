namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class SignInResponseDto
    {
        public long AccountId { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public TokenInfoDto? TokenInfo { get; set; }
    }
}