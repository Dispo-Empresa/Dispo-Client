using Dispo.Commom;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Entities;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class ManufacturerService : IManufacturerService
    {
        private readonly IManufacturerRepository _manufacturerRepository;

        public ManufacturerService(IManufacturerRepository manufacturerRepository)
        {
            _manufacturerRepository = manufacturerRepository;
        }

        public long CreateManufacturer(ManufacturerRequestDto manufacturerRequestDto)
        {
            if (_manufacturerRepository.GetManufacturerIdByName(manufacturerRequestDto.Name).IsIdValid())
                throw new AlreadyExistsException("Já existe o fabricante informado");

            long manufacturerCreatedId = IDHelper.INVALID_ID;
            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var manufacturer = new Manufacturer()
                {
                    Name = manufacturerRequestDto.Name,
                };

                var manufacturerCreated = _manufacturerRepository.Create(manufacturer);
                tc.Complete();

                manufacturerCreatedId = manufacturer.Id;
            }

            return manufacturerCreatedId;
        }
    }
}