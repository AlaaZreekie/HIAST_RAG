using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.PostDtos
{
    public class UpdatePostDto : BaseDto<Guid>
    {
        public DateTime? PublicationDate { get; set; }
        public Guid? CategoryId { get; set; }
        public IList<UpdatePostTranslationDto>? Translations { get; set; }
    }
}
