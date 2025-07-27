using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SlideDtos
{
    /// <summary>
    /// DTO for filtering sliders.
    /// </summary>
    public class SliderFilterDto
    {
        public Guid? Id { get; set; }
        public string? LinkURL { get; set; }
        public string? Title { get; set; }
        public LanguageCodeEnum? LanguageCode { get; set; }
    }
}
