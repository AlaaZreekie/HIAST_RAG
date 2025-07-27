using Application.Dtos.TrainingCourseCategoryDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;

public record GetTrainingCourseCategoriesByFilterQuery(TrainingCourseCategoryFilterDto Filter) : IRequest<IEnumerable<TrainingCourseCategory>>;