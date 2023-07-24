namespace Dispo.APIs
{
    public interface IAccountPrincipal
    {
        long AccountId { get; }
        string UserName { get; }
        string Role { get; }
    }
}
