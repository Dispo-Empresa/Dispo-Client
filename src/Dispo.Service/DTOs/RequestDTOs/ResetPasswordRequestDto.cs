namespace Dispo.Service.DTOs.RequestDTOs
{
    public class ResetPasswordRequestDto
    {
        public long AccountId { get; set; }
        public string NewPassword { get; set; }
    }
}