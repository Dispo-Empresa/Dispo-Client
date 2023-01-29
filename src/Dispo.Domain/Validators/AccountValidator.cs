using Dispo.Domain.Entities;
using FluentValidation;

namespace Dispo.Domain.Validators
{
    public class AccountValidator : AbstractValidator<Account>
    {
        public AccountValidator()
        {
            RuleFor(x => x.Email)
                .NotNull()
                .WithMessage("O email não pode ser nulo")
                .NotEmpty()
                .WithMessage("O email não pode ser vázio.")
                .MinimumLength(6)
                .WithMessage("O email deve ter no mínimo 6 caractéres.")
                .MaximumLength(180)
                .WithMessage("O email não pode ter mais de 180 caractéres.")
                .Matches(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")
                .WithMessage("Email inválido.");

            RuleFor(x => x.Password)
                .NotNull()
                .WithMessage("A senha não pode ser nulo")
                .NotEmpty()
                .WithMessage("A senha não pode ser vázio.")
                .MinimumLength(6)
                .WithMessage("A senha deve ter no mínimo 6 caractéres")
                .MaximumLength(255)
                .WithMessage("A senha deve ter no máximo 255 caractéres");
        }
    }
}