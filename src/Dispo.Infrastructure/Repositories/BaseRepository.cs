using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Dispo.Infrastructure.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : Base
    {
        private readonly DispoContext _dispoContext;

        public BaseRepository(DispoContext dispoContext)
        {
            this._dispoContext = dispoContext;
        }

        public virtual T Create(T obj)
        {
            _dispoContext.Add(obj);
            _dispoContext.SaveChanges();
            return obj;
        }

        public virtual async Task<T> CreateAsync(T obj)
        {
            await _dispoContext.AddAsync(obj);
            await _dispoContext.SaveChangesAsync();
            return obj;
        }

        public virtual IEnumerable<T?> GetAllAsNoTracking()
            => _dispoContext.Set<T>()
                            .AsNoTracking()
                            .ToList();

        public virtual async Task<IEnumerable<T?>> GetAllAsNoTrackingAsync()
            => await _dispoContext.Set<T>()
                                  .AsNoTracking()
                                  .ToListAsync();

        public virtual T? GetByIdAsNoTracking(long id)
            => _dispoContext.Set<T>()
                             .AsNoTracking()
                             .Where(x => x.Id == id)
                             .FirstOrDefault();

        public virtual async Task<T?> GetByIdAsNoTrackingAsync(long id)
            => await _dispoContext.Set<T>()
                                  .AsNoTracking()
                                  .Where(x => x.Id == id)
                                  .FirstOrDefaultAsync();

        public virtual IEnumerable<T?> GetAll()
            => _dispoContext.Set<T>()
                             .ToList();

        public virtual async Task<IEnumerable<T?>> GetAllAsync()
            => await _dispoContext.Set<T>()
                                  .ToListAsync();

        public virtual T? GetById(long id)
            => _dispoContext.Set<T>()
                            .Where(x => x.Id == id)
                            .FirstOrDefault();

        public virtual async Task<T?> GetByIdAsync(long id)
            => await _dispoContext.Set<T>()
                                  .Where(x => x.Id == id)
                                  .FirstOrDefaultAsync();

        public virtual T Update(T obj)
        {
            _dispoContext.Entry(obj).State = EntityState.Modified;
            _dispoContext.SaveChanges();

            return obj;
        }

        public virtual async Task<T> UpdateAsync(T obj)
        {
            _dispoContext.Entry(obj).State = EntityState.Modified;
            await _dispoContext.SaveChangesAsync();

            return obj;
        }

        public virtual void Delete(long id)
        {
            var obj = GetById(id);

            if (obj != null)
            {
                _dispoContext.Remove(obj);
                _dispoContext.SaveChanges();
            }
        }

        public virtual async Task DeleteAsync(long id)
        {
            var obj = await GetByIdAsync(id);

            if (obj != null)
            {
                _dispoContext.Remove(obj);
                await _dispoContext.SaveChangesAsync();
            }
        }
    }
}