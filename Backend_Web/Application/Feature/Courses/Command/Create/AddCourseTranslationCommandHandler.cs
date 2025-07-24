using Application.Feature.Courses.Command.Update;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Courses.Command.Create
{
    public class AddCourseTranslationCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<AddCourseTranslationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(AddCourseTranslationCommand request, CancellationToken cancellationToken)
        {
            var course = await _unitOfWork.Repository<Course>()
                .Find(c => c.Id == request.CourseId, navigationProperties: c => c.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (course is null)
                throw new Exception("Course not found.");

            var translationExists = course.Translations.Any(t => t.LanguageId == request.LanguageId);
            if (translationExists)
                throw new Exception("A translation for this language already exists for the specified course.");

            var newTranslation = new CourseTranslation
            {
                LanguageId = request.LanguageId,
                Name = request.Name,
                Description = request.Description ?? ""
            };

            course.Translations.Add(newTranslation);
            _unitOfWork.Repository<Course>().Update(course);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}