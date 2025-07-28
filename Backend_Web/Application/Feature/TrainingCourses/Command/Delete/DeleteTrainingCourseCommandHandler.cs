using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourses.Command.Delete
{
    public class DeleteTrainingCourseCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteTrainingCourseCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteTrainingCourseCommand request, CancellationToken cancellationToken)
        {
            var courseToDelete = await _unitOfWork.Repository<TrainingCourse>()
                .Find(c => c.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (courseToDelete is null)
                throw new KeyNotFoundException("Training course not found.");

            _unitOfWork.Repository<TrainingCourse>().Remove(courseToDelete);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}