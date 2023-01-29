using Dispo.Domain.Entities;
using FluentValidation;

namespace Dispo.Domain.Validators
{
    public class LocationValidator : AbstractValidator<Location>
    {
        public LocationValidator()
        {
            RuleFor(x => x.Country)
                .NotNull()
                .WithMessage("O país não pode ser nulo")
                .NotEmpty()
                .WithMessage("O país não pode ser vazio")
                .MinimumLength(3)
                .WithMessage("O país deve ter no mínimo 3 caractéres")
                .MaximumLength(200)
                .WithMessage("O país deve ter no máximo 200 caractéres");

            RuleFor(x => x.Country)
                .NotNull()
                .WithMessage("O país não pode ser nulo")
                .NotEmpty()
                .WithMessage("O país não pode ser vazio")
                .MinimumLength(3)
                .WithMessage("O país deve ter no mínimo 3 caractéres")
                .MaximumLength(200)
                .WithMessage("O país deve ter no máximo 200 caractéres");

            RuleFor(x => x.UF)
                .NotNull()
                .WithMessage("A UF não pode ser nula")
                .NotEmpty()
                .WithMessage("A UF não pode ser vazia")
                .MinimumLength(2)
                .WithMessage("A UF deve ter no mínimo 2 caractéres")
                .MaximumLength(3)
                .WithMessage("A UF deve ter no máximo 3 caractéres");

            RuleFor(x => x.City)
                .NotNull()
                .WithMessage("A Cidade não pode ser nula")
                .NotEmpty()
                .WithMessage("A Cidade não pode ser vazia")
                .MinimumLength(3)
                .WithMessage("A Cidade deve ter no mínimo 3 caractéres")
                .MaximumLength(200)
                .WithMessage("A Cidade deve ter no máximo 200 caractéres");

            RuleFor(x => x.District)
                .NotNull()
                .WithMessage("O Bairro não pode ser nula")
                .NotEmpty()
                .WithMessage("O Bairro não pode ser vazia")
                .MinimumLength(3)
                .WithMessage("O Bairro deve ter no mínimo 3 caractéres")
                .MaximumLength(200)
                .WithMessage("O Bairro deve ter no máximo 200 caractéres");
        }
    }
}