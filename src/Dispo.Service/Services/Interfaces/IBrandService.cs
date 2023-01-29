using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IBrandService
    {
        BrandResponseDto CreateBrand(BrandRequestDto brandModel);

        IList<string> GetBrandNames();
    }
}