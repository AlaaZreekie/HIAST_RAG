using Application.DTO.CommonDTO;
using Application.Dtos.CurriculumDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ICurriculumService
    {
        Task<IEnumerable<CurriculumDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateCurriculumDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateCurriculumDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<CurriculumDto>> GetByFilterAsync(CurriculumFilterDto filter, CancellationToken cancellationToken = default);
    }
}