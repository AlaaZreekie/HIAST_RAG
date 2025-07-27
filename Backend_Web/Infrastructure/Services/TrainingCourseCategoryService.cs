using Application.Dtos.TrainingCourseCategoryDtos;
using Application.Feature.Languages.Query;
using Application.Feature.Prges.Query;
using Application.Feature.TrainingCourseCategories.Command.Create;
using Application.Feature.TrainingCourseCategories.Command.Delete;
using Application.Feature.TrainingCourseCategories.Command.Update;
using Application.Feature.TrainingCourseCategories.Query;
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
    public class TrainingCourseCategoryService(ISender mediator, IMapper mapper) : ITrainingCourseCategoryService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<TrainingCourseCategoryDto> CreateAsync(CreateTrainingCourseCategoryDto dto, CancellationToken cancellationToken = default)
        {
            var categoryEntity = new TrainingCourseCategory();
            var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);

            foreach (var transDto in dto.Translations)
            {
                var language = allLanguages.FirstOrDefault(l => l.Code == transDto.LanguageCode);
                if (language == null)
                    throw new KeyNotFoundException($"Language with code '{transDto.LanguageCode}' not found.");

                var translationEntity = _mapper.Map<TrainingCourseCategoryTranslation>(transDto);
                translationEntity.LanguageId = language.Id;
                categoryEntity.Translations.Add(translationEntity);
            }

            var command = new CreateTrainingCourseCategoryCommand(categoryEntity);
            var newId = await _mediator.Send(command, cancellationToken);

            var result = await GetByFilterAsync(new TrainingCourseCategoryFilterDto { Id = newId }, cancellationToken);
            return result.First();
        }

        public async Task UpdateAsync(UpdateTrainingCourseCategoryDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateTrainingCourseCategoryCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            await _mediator.Send(new DeleteTrainingCourseCategoryCommand(id), cancellationToken);
        }

        public async Task<IEnumerable<TrainingCourseCategoryDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var query = new GetAllTrainingCourseCategoriesQuery();
            var categories = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<TrainingCourseCategoryDto>>(categories);
        }

        public async Task<IEnumerable<TrainingCourseCategoryDto>> GetByFilterAsync(TrainingCourseCategoryFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetTrainingCourseCategoriesByFilterQuery>(filter);
            var categories = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<TrainingCourseCategoryDto>>(categories);
        }
    }
}