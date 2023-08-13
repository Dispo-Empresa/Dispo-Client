using Dispo.Domain.DTOs.Request;

namespace Dispo.Service.Services.Interfaces
{
    public interface IAdmService
    {
        void CreateEmployee(CreateEmployeeRequestDto createEmployeeRequestDto);
    }
}
