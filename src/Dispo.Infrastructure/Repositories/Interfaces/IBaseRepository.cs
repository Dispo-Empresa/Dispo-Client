using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository<T> where T : Base
    {
        T Create(T obj);

        Task<T> CreateAsync(T obj);

        T? GetById(long id);

        Task<T?> GetByIdAsync(long id);

        IEnumerable<T?> GetAll();

        Task<IEnumerable<T?>> GetAllAsync();

        IEnumerable<T?> GetAllAsNoTracking();

        Task<IEnumerable<T?>> GetAllAsNoTrackingAsync();

        T Update(T obj);

        Task<T> UpdateAsync(T obj);

        void Delete(long id);

        Task DeleteAsync(long id);
    }
}