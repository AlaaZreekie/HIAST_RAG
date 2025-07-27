using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.IReositosy
{
    public interface IAppRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> Table { get; }

        // --- Find Methods ---
        IQueryable<TEntity> Find(
            Expression<Func<TEntity, bool>> predicate,
            bool asNoTracking = false,
            params Expression<Func<TEntity, object>>[] navigationProperties);

        Task<IEnumerable<TEntity>> FindAsync(
            Expression<Func<TEntity, bool>> predicate,
            bool asNoTracking = false,
            params Expression<Func<TEntity, object>>[] navigationProperties);

        Task<IEnumerable<TEntity>> FindWithAllIncludeAsync(
            Expression<Func<TEntity, bool>> predicate,
            bool asNoTracking = false);

        IQueryable<TEntity> FindWithComplexIncludes(
            Expression<Func<TEntity, bool>> predicate,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includeExpression,
            bool asNoTracking = false);

        // --- Get Methods ---
        IQueryable<TEntity> GetAll(
            bool asNoTracking = false,
            params Expression<Func<TEntity, object>>[] navigationProperties);

        Task<IEnumerable<TEntity>> GetAllAsync(
            bool asNoTracking = false,
            params Expression<Func<TEntity, object>>[] navigationProperties);

        IQueryable<TEntity> GetAllWithAllInclude(bool asNoTracking = false);

        Task<IEnumerable<TEntity>> GetAllWithAllIncludeAsync(bool asNoTracking = false);

        void Insert(TEntity entity);
        void Update(TEntity entity);
        void Remove(TEntity entity);
        Task InsertAsync(TEntity entity);
    }
}
