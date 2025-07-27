using Application.DTO.CommonDTO;
using Application.Dtos.MediaDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SlideDtos
{
    /// <summary>
    /// Represents a detailed view of a Slider.
    /// </summary>
    public class SliderDto : BaseDto<Guid>
    {
        public string LinkURL { get; set; }
        public MediaDto Media { get; set; }
        public ICollection<SliderTranslationDto> Translations { get; set; }
    }
}
