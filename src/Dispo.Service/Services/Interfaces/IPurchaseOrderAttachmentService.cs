using Dispo.Domain.DTOs.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dispo.Service.Services.Interfaces
{
    public interface IPurchaseOrderAttachmentService
    {
        long CreatePurchaseOrderAttachment(PurchaseOrderAttachmentRequestDto PurchaseOrderAttachment);
    }
}
