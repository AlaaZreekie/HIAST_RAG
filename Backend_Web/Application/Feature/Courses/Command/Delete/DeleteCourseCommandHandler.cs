using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Courses.Command.Delete
{
    public class DeleteCourseCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteCourseCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteCourseCommand request, CancellationToken cancellationToken)
        {
            var course = await _unitOfWork.Repository<Course>()
                .Find(c => c.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (course is null)
                throw new KeyNotFoundException("Course not found.");
            
            _unitOfWork.Repository<Course>().Remove(course);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            
        }
    }
}