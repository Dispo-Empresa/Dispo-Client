using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.APIs.Controllers
{
    [Route("/api/v1/warehouses")]
    [ApiController]
    [Authorize(Roles = Roles.Manager)]
    public class WarehouseController : ControllerBase
    {
        private readonly IWarehouseRepository _warehouseRepository;
        private readonly IWarehouseService _warehouseService;
        private readonly IAccountResolverService _accountResolverService;

        public WarehouseController(IWarehouseRepository warehouseRepository, IWarehouseService warehouseService, IAccountResolverService accountResolverService)
        {
            _warehouseRepository = warehouseRepository;
            _warehouseService = warehouseService;
            _accountResolverService = accountResolverService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] WarehouseRequestDto warehouseRequestDto)
        {
            try
            {
                _warehouseService.CreateWarehouse(warehouseRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("O depósito foi criado com sucesso.")
                                                    .WithSuccess(true)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .Build());
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var warehouses = _warehouseRepository.GetWarehouseInfo();

                return Ok(new ResponseModelBuilder().WithData(warehouses)
                                                    .WithSuccess(true)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage("warehouses not found: " + ex.Message)
                                                            .Build());
            }
        }

        [HttpGet]
        [Route("get-with-address-by-user")]
        public IActionResult GetWarehouseWithAddressByUserId()
        {
            try
            {
                var accountId = _accountResolverService.GetLoggedAccountId() ?? throw new NotFoundException("Faça o login no sistema");
                var warehouses = _warehouseRepository.GetWarehousesWithAddressByAccountId(accountId);

                return Ok(new ResponseModelBuilder().WithData(warehouses)
                                                    .WithSuccess(true)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .Build());
            }
        }

        [HttpGet]
        [Route("get-with-address")]
        public IActionResult GetWarehouseWithAddress()
        {
            try
            {
                var warehouses = _warehouseRepository.GetWarehousesWithAddress();

                return Ok(new ResponseModelBuilder().WithData(warehouses)
                                                    .WithSuccess(true)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .Build());
            }
        }
    }
}