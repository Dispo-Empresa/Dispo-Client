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

        public virtual IEnumerable<T?> GetAllAsNoTracking()
            => _dispoContext.Set<T>()
                            .AsNoTracking()
                            .ToList();

        public virtual T? GetByIdAsNoTracking(long id)
            => _dispoContext.Set<T>()
                            .AsNoTracking()
                            .Where(x => x.Id == id)
                            .FirstOrDefault();

        public virtual IEnumerable<T?> GetAll()
            => _dispoContext.Set<T>()
                            .ToList();

        public virtual T? GetById(long id)
            => _dispoContext.Set<T>()
                            .Where(x => x.Id == id)
                            .FirstOrDefault();

        public virtual T Update(T obj)
        {
            _dispoContext.Entry(obj).State = EntityState.Modified;
            _dispoContext.SaveChanges();

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

        public virtual async Task<bool> CreateAsync(T obj)
        {
            await _dispoContext.AddAsync(obj);
            return await _dispoContext.SaveChangesAsync() > 0;
        }

        public virtual async Task<T?> GetByIdAsync(long id)
        {
            return await _dispoContext.Set<T>()
                                      .FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task<IEnumerable<T?>> GetAllAsync()
        {
            return await _dispoContext.Set<T>()
                                    .ToListAsync();
        }

        public virtual async Task<IEnumerable<T?>> GetAllAsNoTrackinAsync()
        {
            return await _dispoContext.Set<T>()
                                    .AsNoTracking()
                                    .ToListAsync();
        }

        public virtual async Task<bool> UpdateAsync(T obj)
        {
            _dispoContext.Entry(obj).State = EntityState.Modified;
            return await _dispoContext.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> DeleteAsync(long id)
        {
            var obj = await GetByIdAsync(id);

            if (obj is null)
                return false;

            _dispoContext.Remove(obj);
            return await _dispoContext.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> ExistsByIdAsync(long id)
        {
            return await _dispoContext.Set<T>().AnyAsync(w => w.Id == id);
        }
    }
}