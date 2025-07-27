using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Courses.Command.Update
{
    public class UpdateCourseCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateCourseCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateCourseCommand request, CancellationToken cancellationToken)
        {
            var course = await _unitOfWork.Repository<Course>()
                .Find(c => c.Id == request.Id, navigationProperties: c => c.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (course is null)
                throw new KeyNotFoundException("Course not found.");

            if (!string.IsNullOrWhiteSpace(request.CourseCode) && course.CourseCode != request.CourseCode)
                course.CourseCode = request.CourseCode;

            if (request.Credits.HasValue && course.Credits != request.Credits.Value)
                course.Credits = request.Credits.Value;

            if (request.TheoreticalHours.HasValue && course.TheoreticalHours != request.TheoreticalHours.Value)
                course.TheoreticalHours = request.TheoreticalHours.Value;

            if (request.PracticalHours.HasValue && course.PracticalHours != request.PracticalHours.Value)
                course.PracticalHours = request.PracticalHours.Value;

            if (request.CourseGroupId.HasValue && course.CourseGroupId != request.CourseGroupId.Value)
                course.CourseGroupId = request.CourseGroupId.Value;

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = course.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.Name) && existingTranslation.Name != transUpdate.Name)
                            existingTranslation.Name = transUpdate.Name;

                        if (transUpdate.Description != null && existingTranslation.Description != transUpdate.Description)
                            existingTranslation.Description = transUpdate.Description;
                    }
                }
            }

            _unitOfWork.Repository<Course>().Update(course);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}