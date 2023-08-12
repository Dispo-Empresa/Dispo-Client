using Dispo.Domain;
using Dispo.Domain.DTOs.Response;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Token.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Dispo.Service.Token
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly IConfiguration _configuration;
        private readonly IAccountRepository _accountRepository;
        private readonly IWarehouseRepository _warehouseRepository;

        public TokenGenerator(IConfiguration configuration, IAccountRepository accountRepository, IWarehouseRepository warehouseRepository)
        {
            _configuration = configuration;
            _accountRepository = accountRepository;
            _warehouseRepository = warehouseRepository;
        }

        public TokenInfoDto GenerateJwtToken(long id, long currentWarehouseId)
        {
            var accountId = id.ToString();
            var userName = _accountRepository.GetUserNameByAccountId(id);
            var accountRole = _accountRepository.GetRoleKeyByAccountId(id);
            var warehouseName = _warehouseRepository.GetNameById(currentWarehouseId);

            var symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty));
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, accountRole),
                new Claim(CustomClaimTypes.AccountId, accountId),
                new Claim(CustomClaimTypes.CurrentWarehouseName, warehouseName),
                new Claim(CustomClaimTypes.CurrentWarehouseId, currentWarehouseId.ToString()),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new TokenInfoDto()
            {
                Token = tokenHandler.WriteToken(token),
                TokenExpirationTime = tokenDescriptor.Expires
            };
        }
    }
}