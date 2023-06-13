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

        Task<bool> CreateAsync(T obj);

        Task<T?> GetByIdAsync(long id);

        Task<IEnumerable<T?>> GetAllAsync();

        Task<IEnumerable<T?>> GetAllAsNoTrackinAsync();

        Task<bool> UpdateAsync(T obj);

        Task<bool> DeleteAsync(long id);

        Task<bool> ExistsByIdAsync(long id);
    }
}