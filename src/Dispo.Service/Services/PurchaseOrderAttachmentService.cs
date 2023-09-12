using Dispo.Domain.DTOs.Request;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Dispo.Domain.Entities;
using System.Transactions;
using Dispo.Commom;

namespace Dispo.Service.Services
{
    public class PurchaseOrderAttachmentService : IPurchaseOrderAttachmentService
    {
        private readonly IPurchaseOrderAttachmentRepository _purchaseOrderAttachmentRepository;
        public PurchaseOrderAttachmentService(IPurchaseOrderAttachmentRepository purchaseOrderAttachmentRepository)
        {
            this._purchaseOrderAttachmentRepository = purchaseOrderAttachmentRepository;
        }
        public long CreatePurchaseOrderAttachment(PurchaseOrderAttachmentRequestDto PurchaseOrderAttachment)
        {
            long purchaseOrderAttachmentId = IDHelper.INVALID_ID;

            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var purchaseOrderAttachment = new PurchaseOrderAttachment()
                {
                    PurchaseOrderId = PurchaseOrderAttachment.PurchaseOrderId,
                    Attatchment = PurchaseOrderAttachment.Attatchment,
                    CreationDate = PurchaseOrderAttachment.CreationDate,
                    ModifieldDate = PurchaseOrderAttachment.ModifieldDate
                };

                _purchaseOrderAttachmentRepository.Create(purchaseOrderAttachment);
                tc.Complete();
                purchaseOrderAttachmentId = purchaseOrderAttachment.Id;
            }
            
            return purchaseOrderAttachmentId;
        }
    }
}
