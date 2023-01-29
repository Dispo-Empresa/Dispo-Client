using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IBranchService
    {
        Task<BranchResponseDto> CreateBranch(BranchRequestDto branchModel);
    }
}