using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository<T> where T : Base
    {
        T Create(T obj);

        T? GetById(long id);

        IEnumerable<T?> GetAll();

        IEnumerable<T?> GetAllAsNoTracking();

        T Update(T obj);

        void Delete(long id);
    }
}