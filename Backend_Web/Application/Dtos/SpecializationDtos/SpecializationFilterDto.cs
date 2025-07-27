using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SpecializationDtos
{
    public class SpecializationFilterDto
    {
        public Guid? Id {  get; set; }
        public Guid? ProgramId { get; set; }
        public Guid? LocationId { get; set; }
        public DegreeTypeEnum? DegreeType { get; set; }
        public string? Name { get; set; }
    }
}
