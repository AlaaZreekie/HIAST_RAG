using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourseCategories.Command.Delete
{
    public class DeleteTrainingCourseCategoryCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteTrainingCourseCategoryCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteTrainingCourseCategoryCommand request, CancellationToken cancellationToken)
        {            
            var categoryToDelete = await _unitOfWork.Repository<TrainingCourseCategory>()
                .Find(c => c.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (categoryToDelete is null)
                throw new KeyNotFoundException("Training course category not found.");

            _unitOfWork.Repository<TrainingCourseCategory>().Remove(categoryToDelete);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}