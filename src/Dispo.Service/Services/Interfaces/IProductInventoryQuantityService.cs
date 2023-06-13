using Dispo.Domain.DTOs.RequestDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dispo.Service.Services.Interfaces
{
    public interface IProductWarehouseQuantityService
    {
        Task<bool> UpdateProductWarehouseQuantityAsync(ProductMovimentationDto productMovimentationDto);
    }
}
