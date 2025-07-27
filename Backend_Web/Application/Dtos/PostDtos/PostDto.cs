using Application.DTO.CommonDTO;
using Application.Dtos.CategoryDtos; // <-- Added using for CategoryDto
using System;
using System.Collections.Generic;

namespace Application.Dtos.PostDtos
{
    public class PostDto : BaseDto<Guid>
    {
        public DateTime PublicationDate { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; }

        // Replaced flat CategoryId and CategoryName with the full DTO
        public CategoryDto Category { get; set; }

        public IList<PostTranslationDto>? Translations { get; set; }
    }
}