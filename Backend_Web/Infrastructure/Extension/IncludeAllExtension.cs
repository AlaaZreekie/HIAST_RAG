using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Extension
{
    public static class IncludeAllExtension
    {
        public static IQueryable<TEntity> IncludeAll<TEntity>(this IQueryable<TEntity> query, DbContext context) where TEntity : class
        {
            var entityType = context.Model.FindEntityType(typeof(TEntity));
            if (entityType == null)
                return query;

            var includedProperties = entityType.GetNavigations().ToList();
            foreach (var property in includedProperties)
            {
                query = query.Include(property.Name);
            }

            return query;
        }
    }
}