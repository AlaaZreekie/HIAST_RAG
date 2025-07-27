using Application.DTO.CommonDTO;
using Application.Dtos.TrainingCourseCategoryDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ITrainingCourseCategoryService
    {
        Task<IEnumerable<TrainingCourseCategoryDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<TrainingCourseCategoryDto>> GetByFilterAsync(TrainingCourseCategoryFilterDto filter, CancellationToken cancellationToken = default);
        Task<TrainingCourseCategoryDto> CreateAsync(CreateTrainingCourseCategoryDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateTrainingCourseCategoryDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}