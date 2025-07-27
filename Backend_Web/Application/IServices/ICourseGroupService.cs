using Application.DTO.CommonDTO;
using Application.Dtos.CourseGroupDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ICourseGroupService
    {
        Task<IEnumerable<CourseGroupDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateCourseGroupDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateCourseGroupDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task AddTranslationAsync(AddCourseGroupTranslationDto dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<CourseGroupDto>> GetByFilterAsync(CourseGroupFilterDto filter, CancellationToken cancellationToken = default);
    }
}