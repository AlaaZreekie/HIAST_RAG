using Application.Dtos.AdmissionExamDtos;
using MediatR;
using System;
using System.Collections.Generic;

namespace Application.Feature.AdmissionExams.Command.Update
{
    public class UpdateAdmissionExamCommand : IRequest
    {
        public Guid Id { get; set; }
        public DateTime? ExamDateTime { get; set; }
        public IList<UpdateAdmissionExamTranslationDto>? Translations { get; set; }
        public bool Save { get; set; } = true;
    }
}