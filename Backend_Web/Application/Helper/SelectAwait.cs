using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Application.Helper
{
    public static class EntityFrameWorkExtension
    {
        public static IAsyncEnumerable<TResult> SelectAwait<TSource, TResult>(this IEnumerable<TSource> source,
            Func<TSource, ValueTask<TResult>> predicate)
        {
            return null;
           // return source.ToAsyncEnumbrable().SelectAwait(predicate);
        }
    }
}
