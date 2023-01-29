namespace Dispo.Service.Services.Interfaces
{
    public interface ITokenGeneratorService
    {
        string GenerateRecoveryTokenNumbers();

        string GenerateRecoveryTokenLetters();
    }
}