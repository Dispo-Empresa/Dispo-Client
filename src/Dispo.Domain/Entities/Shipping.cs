namespace Dispo.Domain.Entities
{
    public class Shipping : Base
    {
        public decimal ShippingPrice { get; set; }
        public DateTime EstimatedDeliveryDate { get; set; }
        public long PurchaseOrderId { get; set; }


        public PurchaseOrder PurchaseOrder { get; set; }
    }
}
