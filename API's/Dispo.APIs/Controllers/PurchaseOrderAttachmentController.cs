using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Entities;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.APIs.Controllers
{
    [Route("/api/v1/purchaseorderattachment")]
    [ApiController]
    [Authorize]
    public class PurchaseOrderAttachmentController : Controller
    {
        private readonly IPurchaseOrderAttachmentRepository _purchaseOrderAttachmentRepository;
        private readonly IPurchaseOrderAttachmentService _purchaseOrderAttachmentService;

        public PurchaseOrderAttachmentController(IPurchaseOrderAttachmentRepository purchaseOrderAttachmentRepository, IPurchaseOrderAttachmentService purchaseOrderAttachmentService)
        {
            _purchaseOrderAttachmentRepository = purchaseOrderAttachmentRepository;
            _purchaseOrderAttachmentService = purchaseOrderAttachmentService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] PurchaseOrderAttachmentRequestDto purchaseOrderAttachmentRequestDto)
        {
            try
            {
                var purchaseOrderAttachmentCreateId = _purchaseOrderAttachmentService.CreatePurchaseOrderAttachment(purchaseOrderAttachmentRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("Anexo de ordem de compra criado com sucesso!")
                                                    .WithSuccess(true)
                                                    .WithData(purchaseOrderAttachmentCreateId)
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
        public IActionResult Index()
        {
            return View();
        }
    }
}
