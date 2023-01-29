using Dispo.Domain.Entities;
using FluentValidation;

namespace Dispo.Domain.Validators
{
    public class BrandValidator : AbstractValidator<Brand>
    {
        public BrandValidator()
        {
            RuleFor(x => x.Name)
                .NotNull()
                .WithMessage("O nome da marca não pode ser nulo")
                .NotEmpty()
                .WithMessage("O nome da marca não pode ser vazio")
                .MinimumLength(3)
                .WithMessage("O nome da marca deve ter no mínimo 3 caracteres")
                .MaximumLength(50)
                .WithMessage("O nome da marca deve ter no máximo 50 caractéres");
        }
    }
}