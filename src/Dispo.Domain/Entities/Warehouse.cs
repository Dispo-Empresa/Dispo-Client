namespace Dispo.Domain.Entities
{
    public class Warehouse : Base
    {
        public long BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual ProductWarehouseQuantity ProductWarehouseQuantity { get; set; }

        public virtual ICollection<Product> Products { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}