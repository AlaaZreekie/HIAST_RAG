using MediatR;

namespace Application.Feature.TrainingCourseCategories.Command.Delete
{
    public record DeleteTrainingCourseCategoryCommand(Guid Id, bool save = true) : IRequest;
}