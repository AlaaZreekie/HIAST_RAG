using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.CourseGroups.Command.Create
{
    public class AddCourseGroupTranslationCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<AddCourseGroupTranslationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(AddCourseGroupTranslationCommand request, CancellationToken cancellationToken)
        {
            var courseGroup = await _unitOfWork.Repository<CourseGroup>()
                .Find(cg => cg.Id == request.CourseGroupId, navigationProperties: cg => cg.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (courseGroup is null)
                throw new Exception("CourseGroup not found.");

            var translationExists = courseGroup.Translations.Any(t => t.LanguageId == request.LanguageId);
            if (translationExists)
                throw new Exception("A translation for this language already exists for the specified course group.");

            var newTranslation = new CourseGroupTranslation
            {
                LanguageId = request.LanguageId,
                Name = request.Name,
            };

            courseGroup.Translations.Add(newTranslation);
            _unitOfWork.Repository<CourseGroup>().Update(courseGroup);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}