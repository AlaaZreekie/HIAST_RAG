using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Books.Command.Delete
{
    public class DeleteBookCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteBookCommand, (string? coverPath, bool isCoverSafeToDelete, string? filePath, bool isFileSafeToDelete)>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<(string? coverPath, bool isCoverSafeToDelete, string? filePath, bool isFileSafeToDelete)> Handle(DeleteBookCommand request, CancellationToken cancellationToken)
        {
            var bookToDelete = await _unitOfWork.Repository<Book>()
                .Find(b => b.Id == request.Id, asNoTracking: true)
                .FirstOrDefaultAsync(cancellationToken);

            if (bookToDelete is null)            
                return (null, false, null, false);
            

            var otherBooksUsingCover = await _unitOfWork.Repository<Book>()
                .Find(b => b.Id != bookToDelete.Id && b.CoverImageMediaId == bookToDelete.CoverImageMediaId)
                .AnyAsync(cancellationToken);

            var otherBooksUsingFile = await _unitOfWork.Repository<Book>()
                .Find(b => b.Id != bookToDelete.Id && b.FileMediaId == bookToDelete.FileMediaId)
                .AnyAsync(cancellationToken);

            bool isCoverSafeToDelete = !otherBooksUsingCover;
            bool isFileSafeToDelete = !otherBooksUsingFile;

            var coverMedia = bookToDelete.CoverImageMediaId != Guid.Empty
                ? await _unitOfWork.Repository<Media>().Find(m => m.Id == bookToDelete.CoverImageMediaId).FirstOrDefaultAsync(cancellationToken)
                : null;

            var fileMedia = bookToDelete.FileMediaId != Guid.Empty
                ? await _unitOfWork.Repository<Media>().Find(m => m.Id == bookToDelete.FileMediaId).FirstOrDefaultAsync(cancellationToken)
                : null;

            _unitOfWork.Repository<Book>().Remove(bookToDelete);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return (coverMedia?.FilePath, isCoverSafeToDelete, fileMedia?.FilePath, isFileSafeToDelete);
        }
    }
}