using Dispo.Service.Services.Interfaces;
using System.Security.Cryptography;

namespace Dispo.Service.Services.PasswordRecovery
{
    public class TokenGeneratorService : ITokenGeneratorService
    {
        private const string CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        private const short TOKEN_SIZE = 6;

        public string GenerateRecoveryTokenNumbers()
        {
            var code = string.Empty;

            for (int i = 0; i < TOKEN_SIZE; i++)
                code += RandomNumberGenerator.GetInt32(0, 10);

            return code;
        }

        public string GenerateRecoveryTokenLetters()
        {
            var random = new Random();
            return new string(Enumerable.Repeat(CHARS, TOKEN_SIZE).Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}