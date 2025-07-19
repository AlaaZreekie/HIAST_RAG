using Application.IReositosy;
using Infrastructure.Context;
using Application.IUnitOfWork;

namespace Infrastructure.UnitOfWork
{
    public class AppUnitOfWork(ApplicationDbContext context) : IAppUnitOfWork
    {
        private readonly ApplicationDbContext _context = context;
        private readonly Dictionary<Type, object> _repositories = new();

        public IAppRepository<T> Repository<T>() where T : class
        {
            if (_repositories.ContainsKey(typeof(T)))
            {
                return (IAppRepository<T>)_repositories[typeof(T)];
            }

            var repository = new AppRepository<T>(_context);
            _repositories.Add(typeof(T), repository);
            return repository;
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }

        public void Dispose()
        {
            _context.Dispose();
            //GC.SuppressFinalize(this);
        }
    }
}
