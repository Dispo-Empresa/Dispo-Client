namespace Dispo.Domain.Entities
{
    public class Order : Base
    {
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public long ProductId { get; set; }
        public long PurchaseOrderId { get; set; }


        public Product Product { get; set; }
        public PurchaseOrder PurchaseOrder { get; set; }
    }
}
