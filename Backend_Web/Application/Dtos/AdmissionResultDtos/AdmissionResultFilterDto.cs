using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionResultDtos
{
    public class AdmissionResultFilterDto
    {
        public Guid? Id { get; set; }
        public Guid? AdmissionId { get; set; }
        public AdmissionResultTypeEnum? ResultType { get; set; }
    }
}
