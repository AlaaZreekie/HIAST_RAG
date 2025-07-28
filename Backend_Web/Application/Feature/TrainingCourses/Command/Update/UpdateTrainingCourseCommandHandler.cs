using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourses.Command.Update
{
    public class UpdateTrainingCourseCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateTrainingCourseCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateTrainingCourseCommand request, CancellationToken cancellationToken)
        {
            var course = await _unitOfWork.Repository<TrainingCourse>()
                .Find(c => c.Id == request.Id, navigationProperties: c => c.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (course is null)
                throw new KeyNotFoundException("Training course not found.");

            if (!string.IsNullOrWhiteSpace(request.CourseCode) && course.CourseCode != request.CourseCode)
                course.CourseCode = request.CourseCode;

            if (request.DurationHours.HasValue && course.DurationHours != request.DurationHours.Value)
                course.DurationHours = request.DurationHours.Value;

            if (request.NumberOfSessions.HasValue && course.NumberOfSessions != request.NumberOfSessions.Value)
                course.NumberOfSessions = request.NumberOfSessions.Value;

            if (!string.IsNullOrWhiteSpace(request.TargetAudience) && course.TargetAudience != request.TargetAudience)
                course.TargetAudience = request.TargetAudience;

            if (request.Year.HasValue && course.Year != request.Year.Value)
                course.Year = request.Year.Value;

            if (request.TrainingCourseCategoryId.HasValue && course.TrainingCourseCategoryId != request.TrainingCourseCategoryId.Value)
                course.TrainingCourseCategoryId = request.TrainingCourseCategoryId.Value;

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = course.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.Title) && existingTranslation.Title != transUpdate.Title)
                            existingTranslation.Title = transUpdate.Title;

                        if (!string.IsNullOrWhiteSpace(transUpdate.Content) && existingTranslation.Content != transUpdate.Content)
                            existingTranslation.Content = transUpdate.Content;
                    }
                }
            }

            _unitOfWork.Repository<TrainingCourse>().Update(course);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}