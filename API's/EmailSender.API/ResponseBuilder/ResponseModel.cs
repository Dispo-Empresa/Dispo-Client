namespace EmailSender.API.ResponseBuilder
{
    public class ResponseModel
    {
        public object? Data { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}