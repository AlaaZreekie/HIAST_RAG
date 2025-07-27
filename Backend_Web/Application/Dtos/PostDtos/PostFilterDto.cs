using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.PostDtos
{
    public class PostFilterDto
    {
        public Guid? Id { get; set; }
        public Guid? AuthorId { get; set; }
        public Guid? CategoryId { get; set; }
        public string? Title { get; set; }
        public LanguageCodeEnum? LanguageCode { get; set; }
        public DateTime? PublicationDateFrom { get; set; }
        public DateTime? PublicationDateTo { get; set; }
    }
}
