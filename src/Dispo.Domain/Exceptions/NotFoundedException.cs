namespace Dispo.Domain.Exceptions
{
    public class NotFoundedException : Exception
    {
        public NotFoundedException()
        { }

        public NotFoundedException(string message)
            : base(message) { }

        public NotFoundedException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}