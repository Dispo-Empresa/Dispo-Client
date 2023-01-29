namespace Dispo.Service.DTOs.PluginDTOs.ResponseDTOs
{
    public class EmailSenderResponseDto
    {
        public bool Success { get; set; } = false;
        public string Message { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}