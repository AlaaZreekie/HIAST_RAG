using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Dtos.MediaDtos
{
    public class CreateMediaDto
    {
        [Required(ErrorMessage = "Media Category ID is required.")]
        public Guid MediaCategoryId { get; set; }

        [Required(ErrorMessage = "A file is required.")]
        public IFormFile File { get; set; }

        [JsonIgnore]
        public MediaDetailsDto? SavedFileDetails { get; set; }
    }
}
