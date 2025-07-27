using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourseCategories.Command.Create
{
    public class CreateTrainingCourseCategoryCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateTrainingCourseCategoryCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateTrainingCourseCategoryCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<TrainingCourseCategory>().InsertAsync(request.Category);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Category.Id;
        }
    }
}