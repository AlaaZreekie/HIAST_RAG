using Application.Dtos.AdmissionExamDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;

namespace Application.Feature.AdmissionExams.Query
{
    public record GetAdmissionExamsByFilterQuery(AdmissionExamFilterDto Filter) : IRequest<IEnumerable<AdmissionExam>>;
}