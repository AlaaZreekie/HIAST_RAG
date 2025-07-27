using Application.Dtos.AdmissionExamDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IAdmissionExamService
    {
        Task<IEnumerable<AdmissionExamDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<AdmissionExamDto>> GetByFilterAsync(AdmissionExamFilterDto filter, CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateAdmissionExamDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateAdmissionExamDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}