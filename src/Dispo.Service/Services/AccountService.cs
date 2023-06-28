using AutoMapper;
using Dispo.Commom;
using Dispo.Domain.Entities;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;
using EscNet.Cryptography.Interfaces;
using EscNet.Hashers.Interfaces.Algorithms;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;
        private readonly IArgon2IdHasher _hasher;
        private readonly IRijndaelCryptography _rijndaelCryptography;
        private readonly IMapper _mapper;

        public AccountService(IAccountRepository accountRepository, IUserRepository userRepository, IArgon2IdHasher hasher, IRijndaelCryptography rijndaelCryptography, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _userRepository = userRepository;
            _hasher = hasher;
            _rijndaelCryptography = rijndaelCryptography;
            _mapper = mapper;
        }

        public UserAccountResponseDto GetUserWithAccountByEmailAndPassword(string email, string password)
        {
            var encryptedEmail = _rijndaelCryptography.Encrypt(email);
            var hashedPassword = _hasher.Hash(password);

            var account = _accountRepository.GetUserWithAccountByEmailAndPassword(encryptedEmail, hashedPassword);

            if (account == null || account.User == null)
                throw new NotFoundedException("Conta ou Usuário não encontrado");

            return new UserAccountResponseDto
            {
                Id = account.Id.ToLong(),
                FirstName = account.User.FirstName,
                LastName = account.User.LastName,
                BirthDate = account.User == null ? DateTime.MinValue : account.User.BirthDate,
                Phone = account.User.Phone,
                CpfCnpj = account.User.Cpf,
                Email = _rijndaelCryptography.Decrypt(account.Email),
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
                var userUpdated = _userRepository.GetUserByAccountId(userAccountModel.Id);

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
    }
}