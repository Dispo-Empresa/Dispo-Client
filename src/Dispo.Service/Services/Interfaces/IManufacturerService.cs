using Dispo.Domain.DTOs.Request;

namespace Dispo.Service.Services.Interfaces
{
    public interface IManufacturerService
    {
        long CreateManufacturer(ManufacturerRequestDto manufacturerRequestDto);
    }
}