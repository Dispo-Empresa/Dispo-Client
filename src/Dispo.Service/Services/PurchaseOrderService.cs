using Dispo.Commom;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Domain.Enums;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IOrderRepository _OrderRepository;

        public PurchaseOrderService(IPurchaseOrderRepository purchaseOrderRepository, IOrderRepository orderRepository)
        {
            this._purchaseOrderRepository = purchaseOrderRepository;
            this._OrderRepository = orderRepository;
        }

        public long CreatePurchaseOrder(PurchaseOrderRequestDto purchaseOrderRequestDto)
        {
            try
            {
                long purchaseOrderCreatedId = IDHelper.INVALID_ID;

                using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    var purchaseOrder = new PurchaseOrder()
                    {
                        Number = purchaseOrderRequestDto.Number,
                        CreationDate = purchaseOrderRequestDto.CreationDate,
                        PaymentMethod = purchaseOrderRequestDto.PaymentMethod,
                        NotificationType = purchaseOrderRequestDto.NotificationType,
                        SupplierId = purchaseOrderRequestDto.SupplierId,
                        WarehouseId = /*purchaseOrderRequestDto.WarehouseId*/ 1,
                    };
                    purchaseOrder.ChangeStatusPurchaseOrder(ePurchaseOrderActions.CREATING);

                    _purchaseOrderRepository.Create(purchaseOrder);

                    purchaseOrderCreatedId = purchaseOrder.Id;

                    var orderList = new List<Order>();
                    foreach (var order in purchaseOrderRequestDto.Orders)
                    {
                        orderList.Add(new Order()
                        {
                            Description = order.Description,
                            Quantity = order.Quantity,
                            TotalPrice = order.TotalPrice,
                            PurchaseOrderId = purchaseOrderCreatedId
                        });
                    }

                    foreach (var order in orderList)
                        _OrderRepository.Create(order);

                    tc.Complete();
                }

                return purchaseOrderCreatedId;
            }
            catch (Exception)
            {               
                throw;
            }          
        }
    }
}
