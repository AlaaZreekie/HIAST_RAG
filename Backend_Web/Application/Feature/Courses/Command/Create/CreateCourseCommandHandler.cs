using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Courses.Command.Create
{
    public class CreateCourseCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateCourseCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Course>().InsertAsync(request.Course);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Course.Id;
        }
    }
}