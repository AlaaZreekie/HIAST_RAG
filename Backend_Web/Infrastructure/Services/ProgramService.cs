using Application.DTO.CommonDTO;
using Application.Dtos.LanguageDtos;
using Application.Dtos.ProgramDtos;
using Application.Feature.Languages.Query;
using Application.Feature.Prges.Query;
using Application.Feature.Programs.Command.Create;
using Application.Feature.Programs.Command.Delete;
using Application.Feature.Programs.Command.Update;
using Application.Feature.Programs.Query;
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
    public class ProgramService : IProgramService
    {
        private readonly ISender _mediator;
        private readonly IMapper _mapper;

        public ProgramService(ISender mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProgramDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var programs = await _mediator.Send(new GetAllProgramsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<ProgramDto>>(programs);
        }

        public async Task<Guid> CreateAsync(CreateProgramDto dto, CancellationToken cancellationToken = default)
        {
            var programEntity = _mapper.Map<Program>(dto);
            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

                foreach (var transDto in dto.Translations)
                {
                    if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                        throw new Exception($"The specified language code '{transDto.LanguageCode}' does not exist in the system.");
                    
                    var programTranslation = _mapper.Map<ProgramTranslation>(transDto);
                    programTranslation.LanguageId = languageId;
                    programEntity.Translations.Add(programTranslation);
                }
            }
            var command = new CreateProgramCommand(programEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task AddTranslationAsync(AddProgramTranslationDto dto, CancellationToken cancellationToken = default)
        {
            var langFilter = new LanguageFilterDto() { Code = dto.LanguageCode };
            var query = new GetLanguageByFilterQuery(langFilter);
            var language = (await _mediator.Send(query, cancellationToken)).FirstOrDefault();
            if (language is null)           
                throw new Exception($"Language with code '{dto.LanguageCode}' not found.");
            
            var command = _mapper.Map<AddProgramTranslationCommand>(dto);
            command.LanguageId = language.Id;
            await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateProgramDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateProgramCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteProgramCommand { Id = dto.Id };
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<ProgramDto>> GetByFilterAsync(ProgramFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetProgramsByFilterQuery>(filter);
            var programs = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<ProgramDto>>(programs);
        }
    }
}
