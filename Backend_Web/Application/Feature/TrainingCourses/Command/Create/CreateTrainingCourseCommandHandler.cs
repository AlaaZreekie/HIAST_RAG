using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourses.Command.Create
{
    public class CreateTrainingCourseCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateTrainingCourseCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateTrainingCourseCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<TrainingCourse>().InsertAsync(request.Course);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Course.Id;
        }
    }
}