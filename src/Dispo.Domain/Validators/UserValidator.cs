using Dispo.Domain.Entities;
using FluentValidation;

namespace Dispo.Domain.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(x => x.FirstName)
                .NotNull()
                .WithMessage("O nome não pode ser nulo")
                .NotEmpty()
                .WithMessage("O nome não pode ser vázio.")
                .MinimumLength(3)
                .WithMessage("O nome deve ter no mínimo 3 caractéres.")
                .MaximumLength(80)
                .WithMessage("O nome não pode ter mais de 80 caractéres.");

            RuleFor(x => x.LastName)
                .NotNull()
                .WithMessage("O sobrenome não pode ser nulo")
                .NotEmpty()
                .WithMessage("O sobrenome não pode ser vázio.")
                .MinimumLength(3)
                .WithMessage("O sobrenome deve ter no mínimo 3 caractéres.")
                .MaximumLength(80)
                .WithMessage("O sobrenome não pode ter mais de 80 caractéres.");

            RuleFor(x => x.CpfCnpj)
                .NotNull()
                .WithMessage("O CPF ou CNPJ não pode ser nulo")
                .NotEmpty()
                .WithMessage("O CPF ou CNPJ não pode ser vázio.")
                .MinimumLength(3)
                .WithMessage("O CPF ou CNPJ deve ter no mínimo 10 caractéres.")
                .MaximumLength(80)
                .WithMessage("O CPF ou CNPJ não pode ter mais de 14 caractéres.")
                .Matches(@"([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")
                .WithMessage("O CPF ou CNPJ não é válido");

            RuleFor(x => x.Phone)
                .Matches(@"^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$")
                .WithMessage("O Número de Telefone ou Celular não é válido");

            RuleFor(x => x.BirthDate)
                .LessThan(p => DateTime.Now)
                .WithMessage("A Data de nascimento está inválida");
        }
    }
}