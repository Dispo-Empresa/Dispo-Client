using Dispo.Commom;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class UserAccountService : IUserAccountService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAccountRepository _accountRepository;

        public UserAccountService(IUserRepository userRepository, IAccountRepository accountRepository)
        {
            _userRepository = userRepository;
            _accountRepository = accountRepository;
        }

        public UserAccountResponseDto UpdateUserAccountInfo(long id, UserAccountResponseDto userAccountModel)
        {
            User? userInfo = null;

            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var userUpdated = new User(); //_userRepository.GetUserByAccountId(id);
                if (userUpdated is null)
                    throw new Exception("Informações não encontradas para esta conta!");

                userUpdated.BirthDate = userAccountModel.BirthDate;
                userUpdated.Cpf = userAccountModel.CpfCnpj;
                userUpdated.FirstName = userAccountModel.FirstName;
                userUpdated.LastName = userAccountModel.LastName;
                userUpdated.Phone = userAccountModel.Phone;

                userInfo = _userRepository.Update(userUpdated);

                tc.Complete();
            }

            return new UserAccountResponseDto()
            {
                Id = id,
                FirstName = userInfo.FirstName,
                LastName = userInfo.LastName,
                BirthDate = userInfo.BirthDate,
                Phone = userInfo.Phone,
                CpfCnpj = userInfo.Cpf,
            };
        }
    }
}