using Application.DTO.CommonDTO;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.ProgramDtos
{
    public class ProgramFilterDto
    {
        public Guid? Id { set; get; }
        public string? Duration { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public LanguageCodeEnum? LanguageCode { get; set; }
    }
}
