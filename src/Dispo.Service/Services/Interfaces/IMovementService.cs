using Dispo.Domain.DTOs.RequestDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IMovementService
    {
        Task MoveProductAsync(ProductMovimentationDto productMovimentationDto);
    }
}