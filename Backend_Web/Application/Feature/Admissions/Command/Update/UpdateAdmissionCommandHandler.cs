using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Admissions.Command.Update
{
    public class UpdateAdmissionCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateAdmissionCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateAdmissionCommand request, CancellationToken cancellationToken)
        {
            var admission = await _unitOfWork.Repository<Admission>()
                .Find(a => a.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (admission is null)
                throw new KeyNotFoundException("Admission not found.");

            if (!string.IsNullOrWhiteSpace(request.AcademicYear))
                admission.AcademicYear = request.AcademicYear;

            if (request.AnnouncementDate.HasValue)
                admission.AnnouncementDate = request.AnnouncementDate.Value;

            if (request.Deadline.HasValue)
                admission.Deadline = request.Deadline.Value;

            if (request.ProgramId.HasValue)
                admission.ProgramId = request.ProgramId.Value;

            if (request.LocationId.HasValue)
                admission.LocationId = request.LocationId.Value;

            _unitOfWork.Repository<Admission>().Update(admission);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}