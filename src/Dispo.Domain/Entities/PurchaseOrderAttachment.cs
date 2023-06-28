namespace Dispo.Domain.Entities
{
    public class PurchaseOrderAttachment : Base
    {
        public long PurchaseOrderId { get; set; }
        public byte[] Attatchment { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModifieldDate { get; set; }


        public PurchaseOrder PurchaseOrder { get; set; }

    }
}
