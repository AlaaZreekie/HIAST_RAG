using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.FaqDtos
{
    public class FaqFilterDto
    {
        public Guid? Id { get; set; }
        public Guid? FaqCategoryId { get; set; }
        public string? Question { get; set; }
        public string? Answer { get; set; }
    }
}
