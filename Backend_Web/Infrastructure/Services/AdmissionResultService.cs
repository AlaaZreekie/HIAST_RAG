using Application.DTO.CommonDTO;
using Application.Dtos.AdmissionDtos;
using Application.Dtos.AdmissionResultDtos;
using Application.Dtos.MediaDtos;
using Application.Feature.Admissions.Query;
using Application.Feature.AdmissionResults.Command.Create;
using Application.Feature.AdmissionResults.Command.Delete;
using Application.Feature.AdmissionResults.Command.Update;
using Application.Feature.AdmissionResults.Query;
using Application.IServices;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Feature.Medias.Command.Delete;

namespace Infrastructure.Services
{
    public class AdmissionResultService(
        ISender mediator,
        IMapper mapper) : IAdmissionResultService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateAdmissionResultWithFileDto dto, Guid mediaId, CancellationToken cancellationToken = default)
        {
            var admissionFilter = new AdmissionFilterDto { Id = dto.AdmissionId };
            var admissionQuery = new GetAdmissionsByFilterQuery(admissionFilter);
            if (!(await _mediator.Send(admissionQuery, cancellationToken)).Any())
                throw new KeyNotFoundException($"Admission with ID '{dto.AdmissionId}' not found.");

            var resultEntity = new AdmissionResult
            {
                AdmissionId = dto.AdmissionId,
                ResultType = dto.ResultType,
                MediaId = mediaId
            };

            var command = new CreateAdmissionResultCommand(resultEntity);
            return await _mediator.Send(command, cancellationToken);            
        }

        public async Task UpdateAsync(UpdateAdmissionResultDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateAdmissionResultCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<string?> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteAdmissionResultCommand(dto.Id);
            var( mediaPathToDelete, mediaIdToDelete )= await _mediator.Send(command, cancellationToken);
            
            return mediaPathToDelete;
        }

        public async Task<IEnumerable<AdmissionResultDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var results = await _mediator.Send(new GetAllAdmissionResultsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<AdmissionResultDto>>(results);
        }

        public async Task<IEnumerable<AdmissionResultDto>> GetByFilterAsync(AdmissionResultFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetAdmissionResultsByFilterQuery>(filter);
            var results = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<AdmissionResultDto>>(results);
        }
    }
}