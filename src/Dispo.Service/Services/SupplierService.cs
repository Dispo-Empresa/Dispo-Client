using Dispo.Commom;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Entities;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;
        private readonly IAddressRepository _addressRepository;

        public SupplierService(ISupplierRepository supplierRepository, IAddressRepository addressRepository)
        {
            _supplierRepository = supplierRepository;
            _addressRepository = addressRepository;
        }

        public long CreateSupplier(SupplierRequestDto supplierRequestDto)
        {
            if (_supplierRepository.GetSupplierIdByName(supplierRequestDto.Name).IsIdValid())
                throw new AlreadyExistsException("Já existe o fornecedor informado");

            long supplierCreatedId = IDHelper.INVALID_ID;
            long addressCreatedId = IDHelper.INVALID_ID;
            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var address = new Address()
                {
                    Country = supplierRequestDto.Address.Country,
                    UF = supplierRequestDto.Address.UF,
                    City = supplierRequestDto.Address.City,
                    District = supplierRequestDto.Address.District,
                    CEP = supplierRequestDto.Address.CEP,
                    AdditionalInfo = supplierRequestDto.Address.AdditionalInfo ?? string.Empty,
                };

                _addressRepository.Create(address);
                tc.Complete();
                addressCreatedId = address.Id;
            }

            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var supplier = new Supplier()
                {
                    Name = supplierRequestDto.Name,
                    ContactName = supplierRequestDto.ContactName,
                    ContactTitle = supplierRequestDto.ContactTitle,
                    Cnpj = supplierRequestDto.Cnpj,
                    Email = supplierRequestDto.Email,
                    Phone = supplierRequestDto.Phone,
                    AddressId = addressCreatedId
                };

                _supplierRepository.Create(supplier);
                tc.Complete();
                supplierCreatedId = supplier.Id;
            }

            return supplierCreatedId;
        }
    }
}