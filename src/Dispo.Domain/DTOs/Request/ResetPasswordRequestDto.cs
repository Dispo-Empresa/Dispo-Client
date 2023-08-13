namespace Dispo.Domain.DTOs.Request
{
    public class ResetPasswordRequestDto
    {
        public long AccountId { get; set; }
        public string NewPassword { get; set; }
    }
}