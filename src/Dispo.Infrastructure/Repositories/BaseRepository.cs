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
    }
}