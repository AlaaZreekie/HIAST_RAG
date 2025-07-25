using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.PageDtos
{
    public class PageFilterDto
    {
        public Guid? Id { get; set; }
        public string? Slug { get; set; }
        public string? Title { get; set; }
        public LanguageCodeEnum? LanguageCode { get; set; }
    }
}
