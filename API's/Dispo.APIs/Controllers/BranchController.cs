using Dispo.API.ResponseBuilder;
using Dispo.Domain.Exceptions;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/branches/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly IBranchService _branchService;

        public BranchController(IBranchService branchService)
        {
            _branchService = branchService;
        }

        [HttpPost]
        [Route("registerBranch")]
        public async Task<IActionResult> CreateBranch(BranchRequestDto branchRequestDto)
        {
            try
            {
                var branchModelCreated = await _branchService.CreateBranch(branchRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("Branch created!")
                                                    .WithSuccess(true)
                                                    .WithData(branchModelCreated)
                                                    .Build());
            }
            catch (AlreadyExistsException ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
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