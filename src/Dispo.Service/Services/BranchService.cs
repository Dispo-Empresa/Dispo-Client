using AutoMapper;
using Dispo.Domain.Entities;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class BranchService : IBranchService
    {
        private readonly IMapper _mapper;
        private readonly IBranchRepository _branchRepository;

        public BranchService(IBranchRepository branchRepository, IMapper mapper)
        {
            _branchRepository = branchRepository;
            _mapper = mapper;
        }

        public async Task<BranchResponseDto> CreateBranch(BranchRequestDto branchModel)
        {
            if (await _branchRepository.ExistsByLocationId(branchModel.LocationId))
                throw new AlreadyExistsException("Já existe essa Filial cadastrada!");

            BranchResponseDto branchDto;
            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var branch = new Branch();
                branch.Name = branchModel.Name;
                branch.Cnpj = branchModel.Cnpj;
                branch.LocationId = branchModel.LocationId;

                var createdBranch = _branchRepository.Create(branch);

                branchDto = _mapper.Map<BranchResponseDto>(createdBranch);
                tc.Complete();
            }

            return branchDto;
        }
    }
}