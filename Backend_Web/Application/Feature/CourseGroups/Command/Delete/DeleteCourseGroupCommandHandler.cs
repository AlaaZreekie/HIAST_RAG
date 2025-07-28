using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.CourseGroups.Command.Delete
{
    public class DeleteCourseGroupCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteCourseGroupCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteCourseGroupCommand request, CancellationToken cancellationToken)
        {
            var courseGroup = await _unitOfWork.Repository<CourseGroup>()
                .Find(p => p.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (courseGroup is null)
                throw new KeyNotFoundException("CourseGroup not found");
            
            _unitOfWork.Repository<CourseGroup>().Remove(courseGroup);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            
        }
    }
}