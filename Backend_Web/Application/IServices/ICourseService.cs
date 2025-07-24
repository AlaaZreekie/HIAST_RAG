using Application.DTO.CommonDTO;
using Application.Dtos.CourseDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateCourseDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateCourseDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task AddTranslationAsync(AddCourseTranslationDto dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<CourseDto>> GetByFilterAsync(CourseFilterDto filter, CancellationToken cancellationToken = default);
    }
}