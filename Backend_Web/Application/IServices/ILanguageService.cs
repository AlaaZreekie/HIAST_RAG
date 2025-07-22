using Application.Dtos.LanguageDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ILanguageService
    {
        Task<Guid> CreateAsync(CreateLanguageDto dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<LanguageDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateLanguageDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
