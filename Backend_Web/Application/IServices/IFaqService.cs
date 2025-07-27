using Application.Dtos.FaqDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IFaqService
    {
        Task<IEnumerable<FaqDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<FaqDto>> GetByFilterAsync(FaqFilterDto filter, CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateFaqDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateFaqDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
