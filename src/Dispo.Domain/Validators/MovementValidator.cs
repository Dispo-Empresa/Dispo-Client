using Dispo.Domain.Entities;
using FluentValidation;

namespace Dispo.Domain.Validators
{
    public class MovementValidator : AbstractValidator<Movement>
    {
        public MovementValidator()
        {
            RuleFor(x => x.Date)
                .NotNull()
                .WithMessage("A data da movimentação não pode ser nula")
                .NotEmpty()
                .WithMessage("A data da movimentação não pode ser vazia");

            RuleFor(x => x.Type)
                 .NotNull()
                 .WithMessage("O tipo da movimentação não pode ser nulo");

            RuleFor(x => x.Quantity)
                .NotNull()
                .WithMessage("A quantidade de produtos na movimentação não pode ser nula")
                .NotEmpty()
                .WithMessage("A quantidade de produtos na movimentação não pode ser vazia")
                .Must(value => value > 0)
                .WithMessage("A quantidade de produtos na movimentação deve ser maior que 0");

            RuleFor(x => x.Product)
                .NotNull()
                .WithMessage("O produto da movimentação não pode ser nulo");
        }
    }
}