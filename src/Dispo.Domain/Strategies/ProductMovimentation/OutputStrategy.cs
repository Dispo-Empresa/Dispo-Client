using Dispo.Domain.Exceptions;

namespace Dispo.Domain.Strategies.ProductMovimentation
{
    public class OutputStrategy : ProductMovimentationStrategy
    {
        public override double MakeMovimentation(double actualQuantity, double movimentationQuantity)
        {
            var newQuantity = actualQuantity - movimentationQuantity;
            if (newQuantity < 0)
                throw new BusinessException("Quantidade da movimentação é maior que a quantidade atual no estoque.");

            return newQuantity;
        }
    }
}
