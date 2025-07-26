using Application.DTO.CommonDTO;
using Application.Dtos.MediaCategoryDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IMediaCategoryService
    {
        Task<IEnumerable<MediaCategoryDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateMediaCategoryDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateMediaCategoryDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task AddTranslationAsync(AddMediaCategoryTranslationDto dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<MediaCategoryDto>> GetByFilterAsync(MediaCategoryFilterDto filter, CancellationToken cancellationToken = default);
    }
}