using Dispo.Domain.Enums;
using Domain.Enums;

namespace Dispo.Domain.Entities
{
    public class PurchaseOrder : Base
    {
        public string Number { get; set; }
        public DateTime CreationDate { get; set; }
        public ePaymentMethod PaymentMethod { get; set; }
        public long WarehouseId { get; set; }
        public eNotificationType NotificationType { get; set; }
        public ePurchaseOrderStatus Status { get; private set; }
        public long SupplierId { get; set; }
        public long ShippingId { get; set; }

        public Warehouse Warehouse { get; set; }
        public Supplier Supplier { get; set; }
        public Shipping Shipping { get; set; }
        public IList<Order> Orders { get; set; }
        public IList<PurchaseOrderAttachment> PurchaseOrderAttachments { get; set; }

        public void ChangeStatusPurchaseOrder(ePurchaseOrderActions actions)
        {
            Status = (Status, actions) switch
            {
                (ePurchaseOrderStatus.CREATED, ePurchaseOrderActions.CREATING) => ePurchaseOrderStatus.CREATED,
                (ePurchaseOrderStatus.CREATED, ePurchaseOrderActions.AWAITING_SUPPLIER) => ePurchaseOrderStatus.AWAITING_SUPPLIER,
                (ePurchaseOrderStatus.CREATED, ePurchaseOrderActions.CANCELING) => ePurchaseOrderStatus.CANCELED,
                (ePurchaseOrderStatus.AWAITING_SUPPLIER, ePurchaseOrderActions.FINISHING) => ePurchaseOrderStatus.FINISHED,
                (ePurchaseOrderStatus.AWAITING_SUPPLIER, ePurchaseOrderActions.DECLINING) => ePurchaseOrderStatus.DECLINED,
                (ePurchaseOrderStatus.AWAITING_SUPPLIER, ePurchaseOrderActions.CANCELING) => ePurchaseOrderStatus.CANCELED,
                (ePurchaseOrderStatus.DECLINED, ePurchaseOrderActions.RENEGOTIATION) => ePurchaseOrderStatus.CREATED,
                (ePurchaseOrderStatus.DECLINED, ePurchaseOrderActions.CANCELING) => ePurchaseOrderStatus.CANCELED,
                _ => Status
            };
        }
    }
}