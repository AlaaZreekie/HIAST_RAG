using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Curriculums.Command.Create
{
    public class CreateCurriculumCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateCurriculumCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateCurriculumCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Curriculum>().InsertAsync(request.Curriculum);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Curriculum.Id;
        }
    }
}