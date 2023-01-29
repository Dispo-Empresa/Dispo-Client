using Dispo.Domain.Entities;
using FluentValidation;

namespace Dispo.Domain.Validators
{
    public class ProviderValidator : AbstractValidator<Provider>
    {
        public ProviderValidator()
        {
            RuleFor(x => x.Name)
                .NotNull()
                .WithMessage("O nome do fornecedor não pode ser nulo")
                .NotEmpty()
                .WithMessage("O nome do fornecedor não pode ser vazio")
                .MinimumLength(3)
                .WithMessage("O nome do fornecedor deve ter no mínimo 3 caractéres")
                .MaximumLength(50)
                .WithMessage("O nome do fornecedor deve ter no máximo 50 caractéres");

            RuleFor(x => x.Cnpj)
                .NotNull()
                .WithMessage("O Cnpj do fornecedor não pode ser nulo")
                .NotEmpty()
                .WithMessage("O Cnpj do fornecedor não pode ser vazio")
                .MinimumLength(18)
                .WithMessage("O Cnpj do fornecedor deve ter no mínimo 18 caractéres")
                .MaximumLength(18)
                .WithMessage("O Cnpj do fornecedor deve ter no máximo 18 caractéres");
        }
    }
}