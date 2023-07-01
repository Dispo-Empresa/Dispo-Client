using Dispo.Domain.Enums;

namespace Dispo.Domain.Entities
{
    public class PurchaseOrder : Base
    {
        public string Number { get; set; }
        public DateTime CreationDate { get; set; }
        public ePaymentMethod PaymentMethod { get; set; }
        public long WarehouseId { get; set; }
        public eNotificationType NotificationType { get; set; }
        public ePurchaseOrderStatus Status { get; set; }
        public long SupplierId { get; set; }
        public long ShippingId { get; set; }


        public Warehouse Warehouse { get; set; }
        public Supplier Supplier { get; set; }
        public Shipping Shipping { get; set; }
        public IList<Order> Orders { get; set; }
        public IList<PurchaseOrderAttachment> PurchaseOrderAttachments { get; set; }
    }
}
