namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class SignUpResponseDto
    {
        public UserAccountResponseDto? userResponseDto { get; set; }
        public TokenResponseDto? tokenResponseDto { get; set; }
    }
}