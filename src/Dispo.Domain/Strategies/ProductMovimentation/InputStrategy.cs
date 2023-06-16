namespace Dispo.Domain.Strategies.ProductMovimentation
{
    public class InputStrategy : ProductMovimentationStrategy
    {
        public override double MakeMovimentation(double actualQuantity, double movimentationQuantity)
        {
            return movimentationQuantity + actualQuantity;
        }
    }
}
