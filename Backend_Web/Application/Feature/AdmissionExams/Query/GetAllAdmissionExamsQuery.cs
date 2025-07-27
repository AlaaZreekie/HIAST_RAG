using Domain.Entity.ApplicationEntity;
using MediatR;

namespace Application.Feature.AdmissionExams.Query
{
    public record GetAllAdmissionExamsQuery : IRequest<IEnumerable<AdmissionExam>>;

}