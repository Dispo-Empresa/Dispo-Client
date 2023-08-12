using Dispo.API.ResponseBuilder;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.APIs.Controllers
{
    [Route("/api/v1/address")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService addressService;

        public AddressController(IAddressService addressRepository)
        {
            this.addressService = addressRepository;
        }

        [HttpGet("get-formatted-addresses")]
        public IActionResult GetAll()
        {
            try
            {
                var addresses = addressService.GetFormattedAddresses();

                return Ok(new ResponseModelBuilder().WithData(addresses)
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