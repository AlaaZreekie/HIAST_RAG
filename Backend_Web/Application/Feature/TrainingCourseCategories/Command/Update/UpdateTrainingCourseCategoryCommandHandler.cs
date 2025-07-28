using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourseCategories.Command.Update
{
    public class UpdateTrainingCourseCategoryCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateTrainingCourseCategoryCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateTrainingCourseCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Repository<TrainingCourseCategory>()
                .Find(c => c.Id == request.Id, navigationProperties: c => c.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (category is null)
                throw new KeyNotFoundException("Training course category not found.");

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = category.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.Name) && existingTranslation.Name != transUpdate.Name)
                            existingTranslation.Name = transUpdate.Name;
                    }
                }
            }

            _unitOfWork.Repository<TrainingCourseCategory>().Update(category);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}