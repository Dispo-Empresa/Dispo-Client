namespace Dispo.Domain.Entities
{
    public class Inventory : Base
    {
        public long BranchId { get; set; }
        public Branch Branch { get; set; }

        public ICollection<Product> Products { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}