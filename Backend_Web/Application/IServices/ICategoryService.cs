using Application.DTO.CommonDTO;
using Application.Dtos.CategoryDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateCategoryDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateCategoryDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task AddTranslationAsync(AddCategoryTranslationDto dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<CategoryDto>> GetByFilterAsync(CategoryFilterDto filter, CancellationToken cancellationToken = default);
    }
}