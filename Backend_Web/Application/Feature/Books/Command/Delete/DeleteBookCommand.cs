using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Books.Command.Delete
{
    public record DeleteBookCommand(Guid Id) : IRequest<(string? coverPath, bool isCoverSafeToDelete, string? filePath, bool isFileSafeToDelete)>;

}
