using Application.DTO.CommonDTO;
using Application.Dtos.CourseDtos;
using Application.Dtos.CourseGroupDtos;
using Application.Dtos.LanguageDtos;
using Application.Feature.CourseGroups.Query;
using Application.Feature.Courses.Command.Create;
using Application.Feature.Courses.Command.Delete;
using Application.Feature.Courses.Command.Update;
using Application.Feature.Courses.Query;
using Application.Feature.Languages.Query;
using Application.Feature.Prges.Query;
using Application.IServices;
using AutoMapper;
using AutoMapper.Features;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.AspNetCore.Cors.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CourseService(ISender mediator, IMapper mapper) : ICourseService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<CourseDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var courses = await _mediator.Send(new GetAllCoursesQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<CourseDto>>(courses);
        }

        public async Task<Guid> CreateAsync(CreateCourseDto dto, CancellationToken cancellationToken = default)
        {
            var filter = new CourseGroupFilterDto { Id = dto.CourseGroupId };
            var query = new GetCourseGroupsByFilterQuery(filter);
            var courseGroupResult = await _mediator.Send(query, cancellationToken);
            if (!courseGroupResult.Any())            
                throw new KeyNotFoundException($"Course Group with ID '{dto.CourseGroupId}' does not exist.");
            
            var courseEntity = _mapper.Map<Course>(dto);

            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

                foreach (var transDto in dto.Translations)
                {
                    if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                        throw new Exception($"Language code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<CourseTranslation>(transDto);
                    translationEntity.LanguageId = languageId;
                    courseEntity.Translations.Add(translationEntity);
                }
            }

            var command = new CreateCourseCommand(courseEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateCourseDto dto, CancellationToken cancellationToken = default)
        {
            if (dto.CourseGroupId.HasValue)
            {
                var filter = new CourseGroupFilterDto { Id = dto.CourseGroupId.Value };
                var query = new GetCourseGroupsByFilterQuery(filter);
                var courseGroupResult = await _mediator.Send(query, cancellationToken);
                if (!courseGroupResult.Any())                
                    throw new Exception($"Course Group with ID '{dto.CourseGroupId.Value}' does not exist.");                
            }

            var command = _mapper.Map<UpdateCourseCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteCourseCommand { Id = dto.Id };
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<CourseDto>> GetByFilterAsync(CourseFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetCoursesByFilterQuery>(filter);
            var courses = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<CourseDto>>(courses);
        }

        public async Task AddTranslationAsync(AddCourseTranslationDto dto, CancellationToken cancellationToken = default)
        {
            var langFilter = new LanguageFilterDto() { Code = dto.LanguageCode };
            var query = new GetLanguageByFilterQuery(langFilter);
            var language = (await _mediator.Send(query, cancellationToken)).FirstOrDefault();

            if (language is null)
                throw new Exception($"Language with code '{dto.LanguageCode}' not found.");

            var command = _mapper.Map<AddCourseTranslationCommand>(dto);
            command.LanguageId = language.Id;

            await _mediator.Send(command, cancellationToken);
        }
    }
}