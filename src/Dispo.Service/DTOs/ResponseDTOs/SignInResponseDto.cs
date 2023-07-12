namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class SignInResponseDto
    {
        public UserAccountResponseDto? UserAccountResponseDto { get; set; }
        public TokenResponseDto? TokenResponseDto { get; set; }
        public string Token { get; set; }
    }
}