using MediatR;

namespace Application.Feature.AdmissionExams.Command.Delete
{
    public record DeleteAdmissionExamCommand(Guid Id) : IRequest;

}