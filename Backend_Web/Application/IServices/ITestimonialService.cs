using Application.DTO.CommonDTO;
using Application.Dtos.TestimonialDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ITestimonialService
    {
        Task<IEnumerable<TestimonialDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<TestimonialDto>> GetByFilterAsync(TestimonialFilterDto filter, CancellationToken cancellationToken = default);
        Task<TestimonialDto> CreateAsync(CreateTestimonialWithFileDto dto, Guid mediaId, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateTestimonialDto dto, CancellationToken cancellationToken = default);
        Task<string?> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
    }
}