using Dispo.Domain.Entities;
using FluentValidation;

namespace Dispo.Domain.Validators
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x => x.Name)
                .NotNull()
                .WithMessage("O nome do produto não pode ser nulo")
                .NotEmpty()
                .WithMessage("O nome do produto não pode ser vazio");

            RuleFor(x => x.UnitPrice)
                .NotNull()
                .WithMessage("O preço unitário do produto não pode ser nulo")
                .Must(value => value > (decimal)0.01)
                .WithMessage("O preço unitário do produto deve ser maior que RS 0.01");

            RuleFor(x => x.Color)
                .NotNull()
                .WithMessage("A cor do produto não pode ser nula")
                .NotEmpty()
                .WithMessage("A cor do produto não pode ser vazia");

            RuleFor(x => x.Code)
                .NotNull()
                .WithMessage("O código do produto não pode ser nulo")
                .NotEmpty()
                .WithMessage("O código do produto não pode ser vazio")
                .MinimumLength(15)
                .WithMessage("O código do produto deve ter no mínimo 15 caractéres")
                .MaximumLength(15)
                .WithMessage("O código do produto deve ter no máximo 15 caractéres");

            RuleFor(x => x.Description)
                .NotNull()
                .WithMessage("A descrição do produto não pode ser nula")
                .NotEmpty()
                .WithMessage("A descrição do produto não pode ser vazia")
                .MinimumLength(15)
                .WithMessage("A descrição do produto deve ter no mínimo 15 caractéres")
                .MaximumLength(500)
                .WithMessage("A descrição do produto deve ter no máximo 500 caractéres");

            RuleFor(x => x.UnitOfMeasurement)
                .NotNull()
                .WithMessage("A unidade de medição do produto não pode ser nula.");

            RuleFor(x => x.Type)
                .NotNull()
                .WithMessage("O tipo do produto não pode ser nulo");
        }
    }
}