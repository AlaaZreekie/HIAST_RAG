using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionExams.Command.Update
{
    public class UpdateAdmissionExamCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateAdmissionExamCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateAdmissionExamCommand request, CancellationToken cancellationToken)
        {
            var exam = await _unitOfWork.Repository<AdmissionExam>()
                .Find(ae => ae.Id == request.Id, navigationProperties: ae => ae.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (exam is null)
                throw new KeyNotFoundException("Admission exam not found.");

            if (request.ExamDateTime.HasValue && exam.ExamDateTime != request.ExamDateTime.Value)
                exam.ExamDateTime = request.ExamDateTime.Value;

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = exam.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.ExamName) && existingTranslation.ExamName.Trim().ToLower() != transUpdate.ExamName.Trim().ToLower())
                            existingTranslation.ExamName = transUpdate.ExamName;

                        if (transUpdate.Notes != null && existingTranslation.Notes.Trim().ToLower() != transUpdate.Notes.Trim().ToLower())
                            existingTranslation.Notes = transUpdate.Notes;
                    }
                }
            }

            _unitOfWork.Repository<AdmissionExam>().Update(exam);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}