namespace Dispo.Service.DTOs.PluginDTOs.RequestsDTOs
{
    public class VerifyEmailCodeRequestDto
    {
        public string Email { get; set; }
        public string InputedToken { get; set; }
    }
}