using Domain.Entity.ApplicationEntity;
using MediatR;

namespace Application.Feature.AdmissionExams.Command.Create
{
    public record CreateAdmissionExamCommand(AdmissionExam AdmissionExam) : IRequest<Guid>;

}