using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Curriculums.Command.Delete
{
    public class DeleteCurriculumCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteCurriculumCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteCurriculumCommand request, CancellationToken cancellationToken)
        {
            var curriculum = await _unitOfWork.Repository<Curriculum>()
                .Find(c => c.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (curriculum is null)
                throw new KeyNotFoundException("Curriculum not found.");

            _unitOfWork.Repository<Curriculum>().Remove(curriculum);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);            
        }
    }
}