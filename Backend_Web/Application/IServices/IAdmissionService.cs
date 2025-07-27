using Application.DTO.CommonDTO;
using Application.Dtos.AdmissionDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IAdmissionService
    {
        Task<Guid> CreateAsync(CreateAdmissionDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateAdmissionDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<AdmissionDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<AdmissionDto>> GetByFilterAsync(AdmissionFilterDto filter, CancellationToken cancellationToken = default);
    }
}