using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.APIs.Controllers
{
    [Route("/api/v1/purchaseorder")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IPurchaseOrderService _purchaseOrderService;
        public PurchaseOrderController(IPurchaseOrderRepository purchaseOrderRepository, IPurchaseOrderService purchaseOrderService)
        {
            this._purchaseOrderRepository = purchaseOrderRepository;
            this._purchaseOrderService = purchaseOrderService;
        }
        [HttpPost]
        public IActionResult Create([FromBody] PurchaseOrderRequestDto purchaseOrderRequestDto)
        {
            try
            {
                var purchaseOrderCreatedId = _purchaseOrderService.CreatePurchaseOrder(purchaseOrderRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("Ordem de compra criada com sucesso!")
                                                    .WithSuccess(true)
                                                    .WithData(purchaseOrderCreatedId)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (AlreadyExistsException ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage($"Erro inesperado:  {ex.Message}")
                                                            .WithSuccess(false)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
        }
    }
}
