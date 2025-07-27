using Application.Dtos.FaqCategoryDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IFaqCategoryService
    {
        Task<IEnumerable<FaqCategoryDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<FaqCategoryDto>> GetByFilterAsync(FaqCategoryFilterDto filter, CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateFaqCategoryDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateFaqCategoryDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}