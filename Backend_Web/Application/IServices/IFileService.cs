using Application.Dtos.MediaDtos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IFileService
    {
        Task<MediaDetailsDto> SaveFileAsync(IFormFile file);
        void DeleteFile(string filePath);
    }
}
