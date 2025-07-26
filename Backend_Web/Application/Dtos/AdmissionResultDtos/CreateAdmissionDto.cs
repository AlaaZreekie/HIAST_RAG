using Application.Dtos.MediaDtos;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionResultDtos
{
    public class CreateAdmissionResultWithFileDto
    {
        [Required]
        public Guid AdmissionId { get; set; }

        [Required]
        public AdmissionResultTypeEnum ResultType { get; set; }
 
        [Required]
        public CreateMediaDto CreateMedia { get; set; }
    }
}
