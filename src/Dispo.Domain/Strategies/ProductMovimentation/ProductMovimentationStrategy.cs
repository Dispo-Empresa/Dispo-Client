namespace Dispo.Domain.Strategies.ProductMovimentation
{
    public abstract class ProductMovimentationStrategy
    {
        public abstract double MakeMovimentation(double actualQuantity, double movimentationQuantity);
    }
}