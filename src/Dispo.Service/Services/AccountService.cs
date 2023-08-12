using AutoMapper;
using Dispo.Commom;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.DTOs.Response;
using Dispo.Domain.Entities;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using EscNet.Cryptography.Interfaces;
using EscNet.Hashers.Interfaces.Algorithms;
using Microsoft.Extensions.Caching.Memory;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class AccountService : IAccountService
    {
        private readonly IMemoryCache _memoryCache;
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;
        private readonly IArgon2IdHasher _hasher;
        private readonly IRijndaelCryptography _rijndaelCryptography;
        private readonly IMapper _mapper;
        private readonly IWarehouseRepository _warehouseRepository;

        public AccountService(IMemoryCache memoryCache, IAccountRepository accountRepository, IUserRepository userRepository, IArgon2IdHasher hasher, IRijndaelCryptography rijndaelCryptography, IMapper mapper, IWarehouseRepository warehouseRepository)
        {
            _memoryCache = memoryCache;
            _accountRepository = accountRepository;
            _userRepository = userRepository;
            _hasher = hasher;
            _rijndaelCryptography = rijndaelCryptography;
            _mapper = mapper;
            _warehouseRepository = warehouseRepository;
        }

        public async Task<Account?> GetByIdAsyncFromCache(long id)
        {
            return await _memoryCache.GetOrCreateAsync(id, async entry =>
            {
                entry.AbsoluteExpiration = DateTime.UtcNow.AddMinutes(10);
                return await _accountRepository.GetByIdAsync(id);
            });
        }

        public SignInResponseDto AuthenticateByEmailAndPassword(string email, string password)
        {
            var encryptedEmail = email;//_rijndaelCryptography.Encrypt(email);
            var hashedPassword = password;//_hasher.Hash(password);

            var loggedAccount = _accountRepository.GetAccountByEmailAndPassword(encryptedEmail, hashedPassword);

            if (loggedAccount == null)
                throw new NotFoundException("Conta não encontrada");

            return new SignInResponseDto()
            {
                AccountId = loggedAccount.Id,
                CurrentWarehouseId = loggedAccount.CurrentWarehouseId ?? _warehouseRepository.GetAllAsNoTracking().First().Id,
            };
        }

        public UserResponseDto CreateAccountAndUser(SignUpRequestDto signUpRequestDto)
        {
            if (_accountRepository.ExistsByEmail(signUpRequestDto.Email))
                throw new AlreadyExistsException("Já existe um usuário com o Email informado");

            if (_userRepository.ExistsByCpfCnpj(signUpRequestDto.CpfCnpj))
                throw new AlreadyExistsException("Já existe um usuário com o CPF/CNPJ informado");

            UserResponseDto userDto;
            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var user = new User
                {
                    BirthDate = signUpRequestDto.BirthDate,
                    Cpf = signUpRequestDto.CpfCnpj,
                    FirstName = signUpRequestDto.FirstName,
                    LastName = signUpRequestDto.LastName,
                    Phone = signUpRequestDto.Phone,
                    Account = new Account
                    {
                        Email = _rijndaelCryptography.Encrypt(signUpRequestDto.Email),
                        Password = _hasher.Hash(signUpRequestDto.Password),
                    },
                };

                var createdUser = _userRepository.Create(user);
                tc.Complete();

                userDto = _mapper.Map<UserResponseDto>(createdUser);
            }
            return userDto;
        }

        public void ResetPassword(long accountId, string newPassword)
        {
            var account = _accountRepository.GetById(accountId);

            if (account != null)
            {
                using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    _accountRepository.ResetPassword(account, _hasher.Hash(newPassword));
                    tc.Complete();
                }
            }
        }

        public UserAccountResponseDto UpdateUserAccountInfo(UserAccountResponseDto userAccountModel)
        {
            User? userInfo = null;

            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var userUpdated = new User(); //_userRepository.GetUserByAccountId(userAccountModel.Id);

                if (userUpdated == null)
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
                Id = userInfo.Id.ToLong(),
                FirstName = userInfo.FirstName,
                LastName = userInfo.LastName,
                BirthDate = userInfo.BirthDate,
                Phone = userInfo.Phone,
                CpfCnpj = userInfo.Cpf,
            };
        }

        public void LinkWarehouses(List<long> warehouseIds, long userId)
        {
            var user = _accountRepository.GetWithWarehousesById(userId) ?? throw new NotFoundException("Esse usuário não existe.");
            foreach (var warehouseId in warehouseIds)
            {
                if (user.WarehouseAccounts.Any(w => w.WarehouseId == warehouseId && w.AccountId == userId))
                    continue;

                user.WarehouseAccounts.Add(new WarehouseAccount(warehouseId, userId));
            }

            _accountRepository.Update(user);
        }

        public void ChangeWarehouse(long userId, long warehouseId)
        {
            var user = _accountRepository.GetById(userId) ?? throw new NotFoundException("Esse usuário não existe.");
            user.CurrentWarehouseId = warehouseId;
            _accountRepository.Update(user);
        }
    }
}