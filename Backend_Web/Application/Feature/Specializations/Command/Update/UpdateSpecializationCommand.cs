using Application.Dtos.SpecializationDtos;
using Domain.Ennum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Specializations.Command.Update
{
    public class UpdateSpecializationCommand : IRequest
    {
        public Guid Id { get; set; }
        public DegreeTypeEnum? DegreeType { get; set; }
        public Guid? ProgramId { get; set; }
        public Guid? LocationId { get; set; }
        public IList<UpdateSpecializationTranslationDto>? Translations { get; set; }
    }
}
