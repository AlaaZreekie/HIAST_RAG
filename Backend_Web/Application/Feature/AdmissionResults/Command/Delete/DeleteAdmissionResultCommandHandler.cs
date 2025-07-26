using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionResults.Command.Delete
{
    public class DeleteAdmissionResultCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteAdmissionResultCommand, Media?>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Media?> Handle(DeleteAdmissionResultCommand request, CancellationToken cancellationToken)
        {
            var resultToDelete = await _unitOfWork.Repository<AdmissionResult>()
                .Find(ar => ar.Id == request.Id)
                .Include(ar => ar.Media)
                .FirstOrDefaultAsync(cancellationToken);

            if (resultToDelete is null)
                throw new KeyNotFoundException("Admission Result not found.");

            var media = resultToDelete.Media;         

            _unitOfWork.Repository<AdmissionResult>().Remove(resultToDelete);

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return media;
        }
    }
}
