using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.MediaDtos
{
    public class UpdateMediaDto : BaseDto<Guid>
    {
        public Guid? MediaCategoryId { get; set; }
    }
}
