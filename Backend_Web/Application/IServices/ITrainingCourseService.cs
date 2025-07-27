using Application.DTO.CommonDTO;
using Application.Dtos.TrainingCourseDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ITrainingCourseService
    {
        Task<IEnumerable<TrainingCourseDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<TrainingCourseDto>> GetByFilterAsync(TrainingCourseFilterDto filter, CancellationToken cancellationToken = default);
        Task<TrainingCourseDto> CreateAsync(CreateTrainingCourseDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateTrainingCourseDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}