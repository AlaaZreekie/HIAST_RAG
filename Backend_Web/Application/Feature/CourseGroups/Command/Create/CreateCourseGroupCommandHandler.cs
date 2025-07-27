using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.CourseGroups.Command.Create
{
    public class CreateCourseGroupCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateCourseGroupCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateCourseGroupCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<CourseGroup>().InsertAsync(request.CourseGroup);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return request.CourseGroup.Id;
        }
    }
}