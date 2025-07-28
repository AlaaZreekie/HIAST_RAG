using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.CourseGroups.Command.Update
{
    public class UpdateCourseGroupCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateCourseGroupCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateCourseGroupCommand request, CancellationToken cancellationToken)
        {
            var courseGroup = await _unitOfWork.Repository<CourseGroup>()
                .Find(cg => cg.Id == request.Id, navigationProperties: cg => cg.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (courseGroup is null)
                throw new KeyNotFoundException("CourseGroup not found.");

            if (request.CourseGroupCode.HasValue && courseGroup.CourseGroupCode != request.CourseGroupCode.Value)
                courseGroup.CourseGroupCode = request.CourseGroupCode.Value;

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var translationToUpdate = courseGroup.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (translationToUpdate != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.Name) && translationToUpdate.Name != transUpdate.Name)
                            translationToUpdate.Name = transUpdate.Name;
                    }
                }
            }

            _unitOfWork.Repository<CourseGroup>().Update(courseGroup);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}