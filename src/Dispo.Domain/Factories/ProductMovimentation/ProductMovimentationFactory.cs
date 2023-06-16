using Dispo.Domain.Enums;
using Dispo.Domain.Exceptions;
using Dispo.Domain.Strategies.ProductMovimentation;

namespace Dispo.Domain.Factories.ProductMovimentation
{
    public static class ProductMovimentationFactory
    {
        public static ProductMovimentationStrategy Create(eMovementType movementType)
        {
            return movementType switch
            {
                eMovementType.Input => new InputStrategy(),
                eMovementType.Output => new OutputStrategy(),
                _ => throw new UnhandledException(),
            };
        }
    }
}
