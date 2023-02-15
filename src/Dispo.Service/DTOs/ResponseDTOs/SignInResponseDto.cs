namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class SignInResponseDto
    {
        public UserAccountResponseDto? userAccountResponseDto { get; set; }
        public TokenResponseDto? tokenResponseDto { get; set; }
    }
}