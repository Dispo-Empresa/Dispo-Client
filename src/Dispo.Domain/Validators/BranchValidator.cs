using Dispo.Domain.Entities;
using FluentValidation;

namespace Dispo.Domain.Validators
{
    public class BranchValidator : AbstractValidator<Branch>
    {
        public BranchValidator()
        {
            RuleFor(x => x.Name)
                .NotNull()
                .WithMessage("O nome da filial não pode ser nulo")
                .NotEmpty()
                .WithMessage("O nome da filial não pode ser vazio")
                .MinimumLength(3)
                .WithMessage("O nome da filial deve ter no mínimo 3 caractéres")
                .MaximumLength(220)
                .WithMessage("O nome da filial deve ter no máximo 220 caractéres");

            RuleFor(x => x.Cnpj)
                .NotNull()
                .WithMessage("O CNPJ não pode ser nulo")
                .NotEmpty()
                .WithMessage("O CNPJ não pode ser vázio.")
                .MinimumLength(14)
                .WithMessage("O CNPJ deve ter no mínimo 14 caractéres.")
                .MaximumLength(14)
                .WithMessage("O CNPJ não pode ter mais de 14 caractéres.")
                .Matches(@"([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")
                .WithMessage("O CNPJ não é válido");
        }
    }
}