namespace Dispo.Service.Cache.Interfaces
{
    public interface ICacheManager
    {
        void Add(string key, string obj, long expiration);

        string Get(string key);

        void Remove(string key);
    }
}