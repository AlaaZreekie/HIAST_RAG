using Application.DTO.CommonDTO;
using Application.Dtos.AdmissionDtos;
using Application.Dtos.AdmissionResultDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IAdmissionResultService
    {
        Task<Guid> CreateAsync(CreateAdmissionResultWithFileDto dto, Guid mediaId, CancellationToken cancellationToken = default);        Task UpdateAsync(UpdateAdmissionResultDto dto, CancellationToken cancellationToken = default);
        Task<string?> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<AdmissionResultDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<AdmissionResultDto>> GetByFilterAsync(AdmissionResultFilterDto filter, CancellationToken cancellationToken = default);
    }
}