using Application.Dtos.LocationDtos;
using Application.Dtos.ProgramDtos;
using Application.Dtos.SpecializationDtos;
using Application.Feature.Locations.Query;
using Application.Feature.Prges.Query;
using Application.Feature.Programs.Query;
using Application.Feature.Specializations.Command.Create;
using Application.Feature.Specializations.Command.Delete;
using Application.Feature.Specializations.Command.Update;
using Application.Feature.Specializations.Query;
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
    public class SpecializationService : ISpecializationService
    {
        private readonly ISender _mediator;
        private readonly IMapper _mapper;

        public SpecializationService(ISender mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SpecializationDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var specializations = await _mediator.Send(new GetAllSpecializationsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<SpecializationDto>>(specializations);
        }

        public async Task<IEnumerable<SpecializationDto>> GetByFilterAsync(SpecializationFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetSpecializationsByFilterQuery>(filter);
            var specializations = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<SpecializationDto>>(specializations);
        }

        public async Task<Guid> CreateAsync(CreateSpecializationDto dto, CancellationToken cancellationToken = default)
        {
            var specializationEntity = _mapper.Map<Specialization>(dto);
            specializationEntity.Translations = [];
            var programFilter = new ProgramFilterDto { Id = dto.ProgramId };
            var program = (await _mediator.Send(new GetProgramsByFilterQuery(programFilter), cancellationToken)).FirstOrDefault();
            if (program is null)
                throw new KeyNotFoundException($"Program not found.");

            var locationFilter = new LocationFilterDto { Id = dto.LocationId };
            var location = (await _mediator.Send(new GetLocationsByFilterQuery(locationFilter), cancellationToken)).FirstOrDefault();
            if (location is null)
                throw new KeyNotFoundException($"Location not found.");

            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                foreach (var transDto in dto.Translations)
                {
                    var language = allLanguages.FirstOrDefault(l => l.Code == transDto.LanguageCode);
                    if (language == null)
                        throw new KeyNotFoundException($"Language with code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<SpecializationTranslation>(transDto);
                    translationEntity.LanguageId = language.Id;
                    specializationEntity.Translations.Add(translationEntity);
                }
            }

            var command = new CreateSpecializationCommand(specializationEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateSpecializationDto dto, CancellationToken cancellationToken = default)
        {
            if (dto.ProgramId.HasValue)
            {
                var programFilter = new ProgramFilterDto { Id = dto.ProgramId.Value };
                var programExists = (await _mediator.Send(new GetProgramsByFilterQuery(programFilter), cancellationToken)).Any();
                if (!programExists)                
                    throw new KeyNotFoundException($"Program not found.");                
            }

            if (dto.LocationId.HasValue)
            {
                var locationFilter = new LocationFilterDto { Id = dto.LocationId.Value };
                var locationExists = (await _mediator.Send(new GetLocationsByFilterQuery(locationFilter), cancellationToken)).Any();
                if (!locationExists)                
                    throw new KeyNotFoundException($"Location not found.");                
            }
            var command = _mapper.Map<UpdateSpecializationCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var command = new DeleteSpecializationCommand(id);
            await _mediator.Send(command, cancellationToken);
        }
    }
}