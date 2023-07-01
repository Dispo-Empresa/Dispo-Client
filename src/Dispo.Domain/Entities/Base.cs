using FluentValidation.Results;

namespace Dispo.Domain.Entities
{
    public abstract class Base
    {
        protected Base()
            => _errors = new List<string>();

        internal List<string> _errors;

        public long Id { get; set; }
        public IReadOnlyCollection<string> Errors => _errors;

        //public abstract void Validate();

        public void AddErrors(IEnumerable<ValidationFailure> errors)
        {
            foreach (var error in errors)
                _errors.Add(error.ErrorMessage);

            if (_errors.Any())
                ThrowException();
        }

        private void ThrowException()
            => throw new Exception(string.Join(';', _errors));
    }
}