using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dispo.Infrastructure.Repositories
{
    public class PurchaseOrderAttachmentRepository : BaseRepository<PurchaseOrderAttachment>, IPurchaseOrderAttachmentRepository
    {
        public PurchaseOrderAttachmentRepository(DispoContext dispoContext) : base(dispoContext)
        {
        }
    }
}
