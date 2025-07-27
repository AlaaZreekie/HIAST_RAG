using Application.Dtos.TrainingCourseCategoryDtos;
using Application.Dtos.TrainingCourseDtos;
using Application.Feature.Languages.Query;
using Application.Feature.Prges.Query;
using Application.Feature.TrainingCourseCategories.Query;
using Application.Feature.TrainingCourses.Command.Create;
using Application.Feature.TrainingCourses.Command.Delete;
using Application.Feature.TrainingCourses.Command.Update;
using Application.Feature.TrainingCourses.Query;
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
    public class TrainingCourseService(ISender mediator, IMapper mapper) : ITrainingCourseService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<TrainingCourseDto> CreateAsync(CreateTrainingCourseDto dto, CancellationToken cancellationToken = default)
        {
            await ValidateCategoryExists(dto.TrainingCourseCategoryId, cancellationToken);

            var courseEntity = _mapper.Map<TrainingCourse>(dto);
            courseEntity.Translations = [];
            var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);

            foreach (var transDto in dto.Translations)
            {
                var language = allLanguages.FirstOrDefault(l => l.Code == transDto.LanguageCode);
                if (language == null)
                    throw new KeyNotFoundException($"Language with code '{transDto.LanguageCode}' not found.");

                var translationEntity = _mapper.Map<TrainingCourseTranslation>(transDto);
                translationEntity.LanguageId = language.Id;
                courseEntity.Translations.Add(translationEntity);
            }

            var command = new CreateTrainingCourseCommand(courseEntity);
            var newId = await _mediator.Send(command, cancellationToken);

            var result = await GetByFilterAsync(new TrainingCourseFilterDto { Id = newId }, cancellationToken);
            return result.First();
        }

        public async Task UpdateAsync(UpdateTrainingCourseDto dto, CancellationToken cancellationToken = default)
        {
            if (dto.TrainingCourseCategoryId.HasValue)
            {
                await ValidateCategoryExists(dto.TrainingCourseCategoryId.Value, cancellationToken);
            }
            var command = _mapper.Map<UpdateTrainingCourseCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            await _mediator.Send(new DeleteTrainingCourseCommand(id), cancellationToken);
        }

        public async Task<IEnumerable<TrainingCourseDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var query = new GetAllTrainingCoursesQuery();
            var courses = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<TrainingCourseDto>>(courses);
        }

        public async Task<IEnumerable<TrainingCourseDto>> GetByFilterAsync(TrainingCourseFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetTrainingCoursesByFilterQuery>(filter);
            var courses = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<TrainingCourseDto>>(courses);
        }

        private async Task ValidateCategoryExists(Guid categoryId, CancellationToken cancellationToken)
        {
            var categoryFilter = new TrainingCourseCategoryFilterDto { Id = categoryId };
            var categoryQuery = new GetTrainingCourseCategoriesByFilterQuery(categoryFilter);
            var categoryExists = (await _mediator.Send(categoryQuery, cancellationToken)).Any();
            if (!categoryExists)
                throw new KeyNotFoundException($"Training Course Category with ID '{categoryId}' not found.");
        }
    }
}