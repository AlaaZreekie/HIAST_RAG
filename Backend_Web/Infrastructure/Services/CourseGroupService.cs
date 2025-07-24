using Application.DTO.CommonDTO;
using Application.Dtos.CourseGroupDtos;
using Application.Dtos.LanguageDtos;
using Application.Feature.CourseGroups.Command.Create;
using Application.Feature.CourseGroups.Command.Delete;
using Application.Feature.CourseGroups.Command.Update;
using Application.Feature.CourseGroups.Query;
using Application.Feature.Languages.Query;
using Application.Feature.Prges.Query;
using Application.IServices;
using Application.IUnitOfWork;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CourseGroupService(ISender mediator, IMapper mapper, IAppUnitOfWork unitOfWork) : ICourseGroupService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateCourseGroupDto dto, CancellationToken cancellationToken = default)
        {
            // This logic remains the same as the ProgramService example
            var courseGroupEntity = _mapper.Map<CourseGroup>(dto);
            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

                foreach (var transDto in dto.Translations)
                {
                    if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                        throw new Exception($"Language code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<CourseGroupTranslation>(transDto);
                    translationEntity.LanguageId = languageId;
                    courseGroupEntity.Translations.Add(translationEntity);
                }
            }
            var command = new CreateCourseGroupCommand(courseGroupEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateCourseGroupDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateCourseGroupCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<CourseGroupDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var courseGroups = await _mediator.Send(new GetAllCourseGroupsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<CourseGroupDto>>(courseGroups);
        }

        public async Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteCourseGroupCommand { Id = dto.Id };
            await _mediator.Send(command, cancellationToken);
        }

        public async Task AddTranslationAsync(AddCourseGroupTranslationDto dto, CancellationToken cancellationToken = default)
        {
            var langFilter = new LanguageFilterDto() { Code = dto.LanguageCode };
            var query = new GetLanguageByFilterQuery(langFilter);
            var language = (await _mediator.Send(query, cancellationToken)).FirstOrDefault();
            if (language is null)
                throw new Exception($"Language with code '{dto.LanguageCode}' not found.");

            var command = _mapper.Map<AddCourseGroupTranslationCommand>(dto);
            command.LanguageId = language.Id;
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<CourseGroupDto>> GetByFilterAsync(CourseGroupFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetCourseGroupsByFilterQuery>(filter);
            var results = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<CourseGroupDto>>(results);
        }
    }
}