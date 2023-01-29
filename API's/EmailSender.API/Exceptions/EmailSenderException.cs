using EmailSender.API.Enums;

namespace EmailSender.API.Exceptions
{
    public class EmailSenderException : Exception
    {
        public EmailSenderException()
        { }

        public EmailSenderException(string message)
            : base(message) { }

        public EmailSenderException(eEventType type, string message)
            : base($"Não foi possível concluir a operação, Tipo do erro: {nameof(type)}. Erro: {message}") { }

        public EmailSenderException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}