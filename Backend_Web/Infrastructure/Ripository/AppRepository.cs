using Application.IReositosy;
using Infrastructure.Context;
using Infrastructure.Extension;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

public class AppRepository<T> : IAppRepository<T> where T : class
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> _entities;

    public AppRepository(ApplicationDbContext context)
    {
        _context = context;
        _entities = context.Set<T>();
    }

    public IQueryable<T> Table => _entities;

    #region Private Helper for Includes
    private IQueryable<T> ApplyIncludes(IQueryable<T> query, params Expression<Func<T, object>>[] navigationProperties)
    {
        if (navigationProperties is not null && navigationProperties.Any())
        {
            foreach (var navigationProperty in navigationProperties)
            {
                query = query.Include(navigationProperty);
            }
        }
        return query;
    }
    #endregion

    #region Find
    public IQueryable<T> Find(
        Expression<Func<T, bool>> predicate,
        bool asNoTracking = false,
        params Expression<Func<T, object>>[] navigationProperties)
    {
        IQueryable<T> query = _entities;

        if (asNoTracking)
            query = query.AsNoTracking();

        query = ApplyIncludes(query, navigationProperties);
        return query.Where(predicate);
    }

    public async Task<IEnumerable<T>> FindAsync(
        Expression<Func<T, bool>> predicate,
        bool asNoTracking = false,
        params Expression<Func<T, object>>[] navigationProperties)
    {
        IQueryable<T> query = _entities;

        if (asNoTracking)
            query = query.AsNoTracking();

        query = ApplyIncludes(query, navigationProperties);
        return await query.Where(predicate).ToListAsync();
    }

    public async Task<IEnumerable<T>> FindWithAllIncludeAsync(
        Expression<Func<T, bool>> predicate,
        bool asNoTracking = false)
    {
        IQueryable<T> query = _entities.IncludeAll(_context); // Assuming IncludeAll is an extension method

        if (asNoTracking)
            query = query.AsNoTracking();

        return await query.Where(predicate).ToListAsync();
    }

    public IQueryable<T> FindWithComplexIncludes(
        Expression<Func<T, bool>> predicate,
        Func<IQueryable<T>, IQueryable<T>> includeExpression,
        bool asNoTracking = false)
    {
        IQueryable<T> query = includeExpression(_entities);

        if (asNoTracking)
            query = query.AsNoTracking();

        return query.Where(predicate);
    }
    #endregion

    #region Get
    public IQueryable<T> GetAll(
        bool asNoTracking = false,
        params Expression<Func<T, object>>[] navigationProperties)
    {
        IQueryable<T> query = _entities;

        if (asNoTracking)
            query = query.AsNoTracking();

        query = ApplyIncludes(query, navigationProperties);
        return query;
    }

    public async Task<IEnumerable<T>> GetAllAsync(
        bool asNoTracking = false,
        params Expression<Func<T, object>>[] navigationProperties)
    {
        IQueryable<T> query = _entities;

        if (asNoTracking)
            query = query.AsNoTracking();

        query = ApplyIncludes(query, navigationProperties);
        return await query.ToListAsync();
    }

    public IQueryable<T> GetAllWithAllInclude(bool asNoTracking = false)
    {
        IQueryable<T> query = _entities.IncludeAll(_context);

        if (asNoTracking)
            query = query.AsNoTracking();

        return query;
    }

    public async Task<IEnumerable<T>> GetAllWithAllIncludeAsync(bool asNoTracking = false)
    {
        IQueryable<T> query = _entities.IncludeAll(_context);

        if (asNoTracking)
            query = query.AsNoTracking();

        return await query.ToListAsync();
    }
    #endregion

    #region CRUD
    public void Insert(T entity)
    {
        _entities.Add(entity);
    }

    public async Task InsertAsync(T entity)
    {
        await _entities.AddAsync(entity);
    }

    public void Update(T entity)
    {
        _entities.Update(entity);
    }

    public void Remove(T entity)
    {
        _entities.Remove(entity);
    }
    #endregion
}