using Dispo.Commom;

namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class ResponseDto
    {
        public long Id { get; set; } = IDHelper.INVALID_ID;
        public bool IsSuccess { get; set; } = false;
        public string Message { get; set; } = string.Empty;
    }
}