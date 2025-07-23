using Application.Dtos.LocationDtos;
using Application.Feature.Locations.Command.Create;
using Application.Feature.Locations.Command.Delete;
using Application.Feature.Locations.Command.Update;
using Application.Feature.Locations.Query;
using Application.Feature.Prges.Query;
using Application.IServices;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class LocationService(ISender mediator, IMapper mapper) : ILocationService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateLocationDto dto, CancellationToken cancellationToken = default)
        {
            var locationEntity = _mapper.Map<Location>(dto);
            locationEntity.Translations = [];
            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                foreach (var transDto in dto.Translations)
                {
                    var language = allLanguages.FirstOrDefault(l => l.Code == transDto.LanguageCode);
                    if (language == null)
                        throw new Exception($"Language with code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<LocationTranslation>(transDto);
                    translationEntity.LanguageId = language.Id;
                    locationEntity.Translations.Add(translationEntity);
                }
            }

            var command = new CreateLocationCommand(locationEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<LocationDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var locations = await _mediator.Send(new GetAllLocationsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<LocationDto>>(locations);
        }

        public async Task UpdateAsync(UpdateLocationDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateLocationCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var command = new DeleteLocationCommand(id);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<LocationDto>> GetByFilterAsync(LocationFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetLocationsByFilterQuery>(filter);
            var locations = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<LocationDto>>(locations);
        }
    }
}
