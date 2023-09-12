using Dispo.Domain.Entities;

namespace Dispo.Domain.DTOs.Request
{
    public class PurchaseOrderAttachmentRequestDto : Base
    {
        public long PurchaseOrderId { get; set; }
        public byte[] Attatchment { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModifieldDate { get; set; }
    }
}


