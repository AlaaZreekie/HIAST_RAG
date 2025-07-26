using Application.DTO.CommonDTO;
using Application.Dtos.AdmissionDtos;
// Assuming you have DTOs and Queries for Program and Location
using Application.Dtos.LocationDtos;
using Application.Dtos.ProgramDtos;
using Application.Feature.Admissions.Command.Create;
using Application.Feature.Admissions.Command.Delete;
using Application.Feature.Admissions.Command.Update;
using Application.Feature.Admissions.Query;
using Application.Feature.Locations.Query;
using Application.Feature.Programs.Query;
using Application.IServices;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class AdmissionService(ISender mediator, IMapper mapper) : IAdmissionService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateAdmissionDto dto, CancellationToken cancellationToken = default)
        {
            await ValidateProgramAndLocationAsync(dto.ProgramId, dto.LocationId, cancellationToken);
            var admissionEntity = _mapper.Map<Admission>(dto);
            var command = new CreateAdmissionCommand(admissionEntity);
            return await _mediator.Send(command, cancellationToken);
             
        }

        public async Task UpdateAsync(UpdateAdmissionDto dto, CancellationToken cancellationToken = default)
        {
            await ValidateProgramAndLocationAsync(dto.ProgramId, dto.LocationId, cancellationToken);

            var command = _mapper.Map<UpdateAdmissionCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteAdmissionCommand(dto.Id);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<AdmissionDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var admissions = await _mediator.Send(new GetAllAdmissionsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<AdmissionDto>>(admissions);
        }

        public async Task<IEnumerable<AdmissionDto>> GetByFilterAsync(AdmissionFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetAdmissionsByFilterQuery>(filter);
            var admissions = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<AdmissionDto>>(admissions);
        }

        private async Task ValidateProgramAndLocationAsync(Guid? programId, Guid? locationId, CancellationToken cancellationToken)
        {
            if (programId.HasValue)
            {
                var programFilter = new ProgramFilterDto { Id = programId.Value };
                var query = new GetProgramsByFilterQuery(programFilter); // Assumes this query exists
                if (!(await _mediator.Send(query, cancellationToken)).Any())
                    throw new KeyNotFoundException($"Program with ID '{programId.Value}' not found.");
            }

            if (locationId.HasValue)
            {
                var locationFilter = new LocationFilterDto { Id = locationId.Value };
                var query = new GetLocationsByFilterQuery(locationFilter); // Assumes this query exists
                if (!(await _mediator.Send(query, cancellationToken)).Any())
                    throw new KeyNotFoundException($"Location with ID '{locationId.Value}' not found.");
            }
        }
    }
}