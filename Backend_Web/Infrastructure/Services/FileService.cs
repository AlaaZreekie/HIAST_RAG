using Application.Dtos.MediaDtos;
using Application.IServices;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private static readonly string[] ImageMimeTypes = { "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml" };
        private static readonly string[] PdfMimeTypes = { "application/pdf" };

        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<MediaDetailsDto> SaveFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File cannot be null or empty.");

            string subDirectory = GetSubDirectoryForMimeType(file.ContentType);
            var directoryPath = Path.Combine(_webHostEnvironment.WebRootPath, subDirectory);

            if (!Directory.Exists(directoryPath))
                Directory.CreateDirectory(directoryPath);

            var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var fullFilePath = Path.Combine(directoryPath, uniqueFileName);

            using (var stream = new FileStream(fullFilePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/{subDirectory}/{uniqueFileName}".Replace('\\', '/');

            return new MediaDetailsDto(
                FileName: file.FileName,
                FilePath: relativePath,
                FileType: file.ContentType
            );
        }

        public void DeleteFile(string? filePath)
        {
            if (string.IsNullOrWhiteSpace(filePath)) return;

            var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, filePath.TrimStart('/'));
            if (File.Exists(physicalPath))
               File.Delete(physicalPath);            
        }

        private string GetSubDirectoryForMimeType(string contentType)
        {
            if (ImageMimeTypes.Contains(contentType.ToLower())) return "Images";
            if (PdfMimeTypes.Contains(contentType.ToLower())) return "PDFs";
            throw new NotSupportedException($"File type '{contentType}' is not supported. Only images and PDFs are allowed.");
        }
    }
}